
import json
import random

courses = [
    ("Advanced English Language Awareness: Grammar", 4),
    ("Advanced English Language Awareness: Listening & Speaking", 4),
    ("Critical Reading", 2),
    ("Introduction to Linguistics", 3),
    ("Phonetics and Phonology", 3),
    ("Discourse Analysis", 3),
    ("Children’s Literature", 3),
    ("Technical Writing", 3),
    ("Public Speaking", 3),
    ("Psycholinguistics", 3),
    ("Sociolinguistics", 3),
    ("Language Acquisition", 3),
    ("ELT Methods", 3),
    ("Research Methods & Statistics", 3),
    ("Introduction to Literature", 3),
    ("Advanced English Language Awareness: Reading & Writing", 4),
    ("Writing for Professional Purposes", 3),
    ("English for Academic Purposes", 3),
    ("SP Graduation Research Project", 6)
]

omani_first_names_m = ["Ahmed", "Said", "Khalid", "Salim", "Mazin", "Faisal", "Rashid", "Mohammed", "Tariq", "Hamdan", "Yousuf", "Ibrahim", "Mubarak", "Sami", "Qais", "Othman", "Ali", "Nasser", "Hassan", "Omar"]
omani_first_names_f = ["Maryam", "Fatma", "Zainab", "Huda", "Rayan", "Amira", "Laila", "Buthaina", "Salma", "Sheikha", "Aziza", "Amal", "Basma", "Amna", "Muna", "Khulood", "Asma", "Safiya", "Saja", "Reem", "Aisha", "Noor", "Israa"]
omani_last_names = ["Al-Balushi", "Al-Harthy", "Al-Kindi", "Al-Zadjali", "Al-Rawahi", "Al-Busaidi", "Al-Amri", "Al-Maamari", "Al-Farsi", "Al-Siyabi", "Al-Hasni", "Al-Raisi", "Al-Ghafri", "Al-Qasmi", "Al-Yaqoobi", "Al-Jabri", "Al-Hinai", "Al-Abri", "Al-Hashmi", "Al-Hosni", "Al-Shuaili", "Al-Maskari", "Al-Riyami", "Al-Subhi", "Al-Lawati", "Al-Said", "Al-Wahaibi", "AlSinani", "Al-Khamisi", "Al-Habsi"]

pricing_options = [
    {"hourly": 2.5, "monthly": 12, "semester": 40, "midterm": 8, "final": 9},
    {"hourly": 3.0, "monthly": 15, "semester": 45, "midterm": 10, "final": 10},
    {"hourly": 2.0, "monthly": 10, "semester": 35, "midterm": 7, "final": 7},
    {"hourly": 2.8, "monthly": 14, "semester": 42, "midterm": 9, "final": 9},
    {"hourly": 1.5, "monthly": 8, "semester": 30, "midterm": 5, "final": 5}
]

tutors = []
tutor_id_counter = 1

for course_name, credit_hours in courses:
    for i in range(5):
        gender = random.choice(['m', 'f'])
        if gender == 'm':
            first = random.choice(omani_first_names_m)
        else:
            first = random.choice(omani_first_names_f)
        last = random.choice(omani_last_names)
        name = f"{first} {last}"
        email = f"{first.lower()}.{last.lower().replace('-', '')}@utas.edu.om"
        
        rating = round(random.uniform(3.5, 5.0), 1)
        pricing = random.choice(pricing_options)
        
        tutor = {
            "id": f"t-{tutor_id_counter}",
            "name": name,
            "email": email,
            "subject": course_name,
            "level": random.choice(["Undergraduate", "Graduate"]),
            "rating": rating,
            "price": pricing["hourly"],
            "pricing": pricing,
            "description": f"Expert in {course_name} with a focus on student success.",
            "about": f"I am a dedicated student at UTAS with a passion for {course_name}. I have consistently achieved high grades in this subject.",
            "teachingPhilosophy": "My teaching philosophy centers on clarity, patience, and practical application of concepts.",
            "photo": f"https://picsum.photos/seed/{tutor_id_counter}/200/200",
            "availability": random.choice([["Weekdays"], ["Weekends"], ["Weekdays", "Weekends"]]),
            "achievements": [f"GPA: {round(random.uniform(3.5, 4.0), 1)}", "Dean's List"],
            "room": f"Room {random.randint(100, 500)} - Block {random.choice(['A', 'B', 'C', 'D', 'E'])}",
            "comments": [
                {"id": f"c-{tutor_id_counter}-1", "studentName": "Ali", "text": "Great tutor!", "rating": 5, "date": "2024-03-25"}
            ],
            "teachingModes": random.choice([["Online"], ["Online", "Face-to-Face"]]),
            "sessionsPerWeek": random.randint(1, 5)
        }
        tutors.append(tutor)
        tutor_id_counter += 1

students = []
for i in range(20):
    gender = random.choice(['m', 'f'])
    if gender == 'm':
        first = random.choice(omani_first_names_m)
    else:
        first = random.choice(omani_first_names_f)
    last = random.choice(omani_last_names)
    name = f"{first} {last}"
    email = f"{first.lower()}.{last.lower().replace('-', '')}@utas.edu.om"
    
    student = {
        "id": f"s-{i+1}",
        "name": name,
        "email": email,
        "role": "Student",
        "major": "English",
        "interest": random.choice([c[0] for c in courses]),
        "joinDate": "Oct 2024"
    }
    students.append(student)

data_file_content = f"""
export interface PricingOptions {{
  hourly: number;
  monthly: number;
  semester: number;
  midterm: number;
  final: number;
}}

export interface Tutor {{
  id: string;
  name: string;
  email: string;
  subject: string;
  level: string;
  rating: number;
  price: number;
  pricing: PricingOptions;
  description: string;
  about: string;
  teachingPhilosophy: string;
  photo: string;
  availability: string[];
  achievements: string[];
  room: string;
  comments: Comment[];
  teachingModes: string[];
  sessionsPerWeek: number;
}}

export interface Student {{
  id: string;
  name: string;
  email: string;
  role: string;
  major: string;
  interest: string;
  joinDate: string;
}}

export interface Comment {{
  id: string;
  studentName: string;
  text: string;
  rating: number;
  date: string;
}}

export interface CourseData {{
  name: string;
  creditHours: number;
}}

export const COURSES: CourseData[] = {json.dumps([{"name": c[0], "creditHours": c[1]} for c in courses], indent=2)};

export const MOCK_TUTORS: Tutor[] = {json.dumps(tutors, indent=2)};

export const MOCK_STUDENTS: Student[] = {json.dumps(students, indent=2)};

export const SUBJECTS = COURSES.map(c => c.name);
"""

with open("src/data.ts", "w") as f:
    f.write(data_file_content.strip())
