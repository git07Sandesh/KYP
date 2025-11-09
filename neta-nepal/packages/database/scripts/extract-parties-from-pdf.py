#!/usr/bin/env python3
"""
Extract political party data from ECN PDF
Hybrid approach: Extract what we can, leave placeholders for manual completion
"""

import pdfplumber
import json
import re
from datetime import datetime

def extract_parties_from_pdf(pdf_path):
    """Extract party data from the ECN registration PDF"""
    parties = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            print(f"Processing page {page_num}/{len(pdf.pages)}...")
            
            # Try multiple extraction strategies
            
            # Strategy 1: Extract tables with settings
            tables = page.extract_tables({
                "vertical_strategy": "lines",
                "horizontal_strategy": "lines",
                "snap_tolerance": 3,
            })
            
            if tables:
                for table in tables:
                    if not table or len(table) < 2:
                        continue
                    
                    # Process each row (skip header if first row looks like header)
                    start_idx = 1 if (table[0] and any(h in str(table[0]) for h in ['सि.न', 'दर्ता नं', 'नाम'])) else 0
                    
                    for row_idx, row in enumerate(table[start_idx:], 1):
                        if not row or len(row) < 3:
                            continue
                        
                        # Skip rows that are clearly headers or dividers
                        row_text = ' '.join(str(cell) for cell in row if cell)
                        if not row_text.strip() or len(row_text.strip()) < 5:
                            continue
                        
                        try:
                            # More flexible column mapping
                            party = {
                                # Map columns - adjust indices based on actual structure
                                "registrationNumber": clean_text(row[0]) if len(row) > 0 else None,
                                "nameNepali": clean_text(row[1]) if len(row) > 1 else None,
                                "applicationDateBs": clean_text(row[2]) if len(row) > 2 else None,
                                "registrationDateBs": clean_text(row[3]) if len(row) > 3 else None,
                                "headquarters": clean_text(row[4]) if len(row) > 4 else None,
                                "contactInfo": clean_text(row[5]) if len(row) > 5 else None,
                                "leadershipInfo": clean_text(row[6]) if len(row) > 6 else None,
                                "symbolNameNepali": clean_text(row[7]) if len(row) > 7 else None,
                                
                                # Fields requiring manual completion
                                "name": None,  # TODO: Translate from Nepali
                                "shortName": None,  # TODO: Add common abbreviation
                                "shortNameNepali": None,
                                "applicationDateAd": None,  # TODO: Convert BS to AD
                                "registrationDateAd": None,  # TODO: Convert BS to AD
                                "renewalDateBs": None,
                                "renewalDateAd": None,
                                "province": None,  # TODO: Extract from headquarters
                                "district": None,  # TODO: Extract from headquarters
                                "contactPhone": None,  # TODO: Parse from contactInfo
                                "contactEmail": None,
                                "chairpersonName": None,  # TODO: Parse from leadershipInfo
                                "chairpersonNameNepali": None,
                                "generalSecretaryName": None,
                                "generalSecretaryNameNepali": None,
                                "symbolName": None,  # TODO: Translate from Nepali
                                "symbolUrl": None,  # TODO: Extract/upload symbol image
                                "symbolDescription": None,
                                "foundedYear": None,
                                "website": None,
                                "ideology": None,
                                "isActive": True,
                                "isMajorParty": False,
                                "dataSource": "ECN-2080-PDF",
                                "verificationStatus": "PENDING",
                                
                                # Metadata
                                "_pageNumber": page_num,
                                "_rowIndex": row_idx,
                                "_rawRow": str(row)[:200],  # Store first 200 chars for debugging
                                "_extractedAt": datetime.now().isoformat()
                            }
                            
                            # Only add if we have meaningful data (at least name or reg number)
                            if party["nameNepali"] or party["registrationNumber"]:
                                parties.append(party)
                                print(f"  ✓ Extracted: {party['nameNepali'][:40] if party['nameNepali'] else 'Unknown'}")
                                
                        except Exception as e:
                            print(f"  ⚠ Error processing row {row_idx} on page {page_num}: {e}")
                            continue
            
            # Strategy 2: If no tables found, extract text and try to parse
            if not parties or page_num == 1:  # Always try on first page
                text = page.extract_text()
                if text:
                    # Look for party names (lines that might be party names in Nepali)
                    lines = text.split('\n')
                    for line in lines:
                        if len(line.strip()) > 10 and 'पार्टी' in line:
                            print(f"  Found potential party: {line[:60]}")
    
    return parties

def clean_text(text):
    """Clean extracted text"""
    if not text:
        return None
    
    text = str(text).strip()
    
    # Remove excessive whitespace
    text = re.sub(r'\s+', ' ', text)
    
    # Remove null bytes
    text = text.replace('\x00', '')
    
    return text if text else None

def save_to_json(parties, output_path):
    """Save extracted data to JSON with pretty formatting"""
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(parties, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Extracted {len(parties)} parties")
    print(f"📁 Saved to: {output_path}")

def generate_manual_completion_guide(parties, output_path):
    """Generate a guide for manual completion"""
    guide = {
        "instructions": {
            "overview": "Complete the missing fields for each party",
            "required_fields": [
                "name (English translation)",
                "symbolName (English translation)",
                "symbolUrl (upload symbol and add path)"
            ],
            "recommended_fields": [
                "shortName (e.g., NC, UML, Maoist Center)",
                "contactPhone (parse from contactInfo)",
                "chairpersonName (parse from leadershipInfo)",
                "province/district (extract from headquarters)",
                "website (search online)",
                "isMajorParty (true for NC, UML, Maoist, RSP, RPP, JSP)"
            ],
            "date_conversion": {
                "info": "Convert BS dates to AD using online converter",
                "tools": [
                    "https://www.ashesh.com.np/nepali-date-converter/",
                    "https://nepalicalendar.rat32.com/index.php"
                ]
            },
            "symbol_extraction": {
                "info": "Extract symbol images from PDF",
                "steps": [
                    "1. Open PDF in Preview/Adobe",
                    "2. Screenshot each symbol",
                    "3. Save as PNG in /apps/web/public/party-symbols/",
                    "4. Add path like '/party-symbols/nepal-congress.png'"
                ]
            }
        },
        "statistics": {
            "total_parties": len(parties),
            "parties_needing_completion": len(parties),
            "estimated_time": f"{len(parties) * 3} minutes (3 min per party)"
        },
        "sample_party": parties[0] if parties else None
    }
    
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(guide, f, ensure_ascii=False, indent=2)
    
    print(f"📖 Completion guide saved to: {output_path}")

if __name__ == "__main__":
    import sys
    
    if len(sys.argv) < 2:
        print("Usage: python extract-parties-from-pdf.py <pdf_path>")
        sys.exit(1)
    
    pdf_path = sys.argv[1]
    output_json = "/Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/packages/database/data/parties-extracted.json"
    guide_json = "/Users/sandeshbhattarai/Desktop/neta_china/neta-nepal/packages/database/data/parties-completion-guide.json"
    
    print("🔍 Extracting party data from PDF...")
    print(f"📄 Source: {pdf_path}\n")
    
    parties = extract_parties_from_pdf(pdf_path)
    
    save_to_json(parties, output_json)
    generate_manual_completion_guide(parties, guide_json)
    
    print("\n🎯 Next Steps:")
    print("1. Open parties-extracted.json")
    print("2. Complete the null fields (use completion guide)")
    print("3. Run: npx tsx prisma/seeds/02-political-parties.ts")
