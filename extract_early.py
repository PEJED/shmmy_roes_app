import re

with open('pdftotext_out.txt', 'r', encoding='utf-8') as f:
    text = f.read()

# Try to find sequences of courses by semester
semesters = ["1ο ΕΞΑΜΗΝΟ", "2ο ΕΞΑΜΗΝΟ", "3ο ΕΞΑΜΗΝΟ", "4ο ΕΞΑΜΗΝΟ", "5ο ΕΞΑΜΗΝΟ", "6ο ΕΞΑΜΗΝΟ"]

with open('early_semesters.txt', 'w', encoding='utf-8') as out:
    for i in range(len(semesters)-1):
        start_idx = text.find(semesters[i])
        end_idx = text.find(semesters[i+1])
        if start_idx != -1 and end_idx != -1:
            out.write(f"=== {semesters[i]} ===\n")
            out.write(text[start_idx:end_idx].strip() + "\n\n")
