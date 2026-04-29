// PeerTutor Progress Management
interface ReflectionData {
  summary: string;
  goal: string;
}

interface CourseMaterial {
  name: string;
  type: 'pdf' | 'link' | 'worksheet';
  url: string;
}

interface CourseBooking {
  tutorName: string;
  tutorImg: string;
  courseName: string;
  courseCode: string;
  dateTime: string;
  type: 'Online' | 'Face-to-Face';
  status: 'Completed' | 'Upcoming' | 'Cancelled';
  feedback: string;
  progressLevel: number;
  actionPlan: string;
  recordingTitle?: string;
  materials?: CourseMaterial[];
}

const MOCK_BOOKINGS: CourseBooking[] = [
  {
    tutorName: "Fatma Al-Harthy",
    tutorImg: "https://picsum.photos/seed/sarah/100/100",
    courseName: "Advanced English Language Awareness: Grammar",
    courseCode: "EDEN1101",
    dateTime: "Mar 20, 2024 at 10:00 AM",
    type: "Online",
    status: "Completed",
    feedback: "You've made great progress on complex sentence structures. Your writing is becoming much more fluid and clear.",
    progressLevel: 85,
    actionPlan: "Focus on modal verbs and their nuances in professional contexts for the next session.",
    recordingTitle: "Grammar Deep Dive - Session 4",
    materials: [
      { name: "Complex Sentences PDF", type: "pdf", url: "#" },
      { name: "Interactive Grammar Exercises", type: "link", url: "#" }
    ]
  },
  {
    tutorName: "Khalid Al-Rawahi",
    tutorImg: "https://picsum.photos/seed/khalid/100/100",
    courseName: "Introduction to Linguistics",
    courseCode: "EDEN1207",
    dateTime: "Apr 10, 2024 at 02:00 PM",
    type: "Face-to-Face",
    status: "Upcoming",
    feedback: "Preparation is key. Please review the phonetics chart we discussed last time.",
    progressLevel: 45,
    actionPlan: "We will be focusing on morphology and syntax in upcoming sessions.",
    materials: [
      { name: "Linguistics Intro Worksheet", type: "worksheet", url: "#" }
    ]
  },
  {
    tutorName: "Fatma Al-Harthy",
    tutorImg: "https://picsum.photos/seed/sarah/100/100",
    courseName: "Advanced English Language Awareness: Grammar",
    courseCode: "EDEN1101",
    dateTime: "Mar 15, 2024 at 11:00 AM",
    type: "Online",
    status: "Cancelled",
    feedback: "Session was cancelled due to a scheduling conflict. Please reschedule at your convenience.",
    progressLevel: 70,
    actionPlan: "Reschedule the session to continue from where we left off."
  }
];

class ProgressManager {
  private summaryTextarea: HTMLTextAreaElement | null = null;
  private goalInput: HTMLInputElement | null = null;
  private saveButton: HTMLButtonElement | null = null;
  private modal: HTMLElement | null = null;

  constructor() {
    this.init();
    this.exposeGlobalFunctions();
  }

  private init() {
    this.summaryTextarea = document.querySelector('textarea[placeholder="Write your thoughts..."]');
    this.goalInput = document.querySelector('input[placeholder="Set a goal..."]');
    this.saveButton = Array.from(document.querySelectorAll('button')).find(btn => btn.textContent?.trim().toLowerCase() === 'save update') || null;
    this.modal = document.getElementById('course-details-modal');

    if (this.saveButton) {
      this.loadData();
      this.addEventListeners();
    }
  }

  private exposeGlobalFunctions() {
    (window as any).openCourseDetails = (index: number) => this.openModal(index);
    (window as any).closeCourseDetails = () => this.closeModal();
  }

  private openModal(index: number) {
    const booking = MOCK_BOOKINGS[index];
    if (!booking || !this.modal) return;

    // Update Modal Content
    const imgElement = document.getElementById('modal-tutor-img') as HTMLImageElement;
    if (imgElement) imgElement.src = booking.tutorImg;

    const courseNameEl = document.getElementById('modal-course-name');
    if (courseNameEl) courseNameEl.textContent = `${booking.courseCode} — ${booking.courseName}`;

    const tutorNameEl = document.getElementById('modal-tutor-name');
    if (tutorNameEl) tutorNameEl.textContent = `Tutor: ${booking.tutorName}`;

    const statusEl = document.getElementById('modal-status');
    if (statusEl) {
      statusEl.textContent = booking.status;
      statusEl.className = `px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
        booking.status === 'Completed' ? 'bg-green-100 text-green-700' :
        booking.status === 'Upcoming' ? 'bg-blue-600 text-white' :
        'bg-slate-200 text-slate-500'
      }`;
    }

    const typeEl = document.getElementById('modal-type');
    if (typeEl) {
      typeEl.textContent = booking.type;
      typeEl.className = `px-3 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap ${
        booking.type === 'Online' ? 'bg-blue-100 text-blue-700' : 'bg-indigo-100 text-indigo-700'
      }`;
    }

    const dateTimeEl = document.getElementById('modal-date-time');
    if (dateTimeEl) dateTimeEl.textContent = booking.dateTime;

    const progressBarEl = document.getElementById('modal-progress-bar');
    if (progressBarEl) progressBarEl.style.width = `${booking.progressLevel}%`;

    const progressTextEl = document.getElementById('modal-progress-text');
    if (progressTextEl) progressTextEl.textContent = `${booking.progressLevel}%`;

    const feedbackEl = document.getElementById('modal-feedback');
    if (feedbackEl) feedbackEl.textContent = booking.feedback;

    const actionPlanEl = document.getElementById('modal-action-plan');
    if (actionPlanEl) actionPlanEl.textContent = booking.actionPlan;

    // Recording Section
    const recordingSection = document.getElementById('modal-recording-section');
    if (recordingSection) {
      if (booking.type === 'Online' && booking.recordingTitle) {
        recordingSection.classList.remove('hidden');
        const recordingTitleEl = document.getElementById('modal-recording-title');
        if (recordingTitleEl) recordingTitleEl.textContent = booking.recordingTitle;
      } else {
        recordingSection.classList.add('hidden');
      }
    }

    // Materials Section
    const materialsSection = document.getElementById('modal-materials-section');
    const materialsList = document.getElementById('modal-materials-list');
    if (materialsSection && materialsList) {
      if (booking.materials && booking.materials.length > 0) {
        materialsSection.classList.remove('hidden');
        materialsList.innerHTML = booking.materials.map(mat => `
          <a href="${mat.url}" class="flex items-center gap-3 p-4 bg-slate-50 border border-slate-100 rounded-2xl hover:bg-white hover:border-purple-200 hover:shadow-sm transition-all group no-underline">
            <div class="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-purple-600 transition-colors">
              ${mat.type === 'pdf' ? 
                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15h6"/><path d="M9 11h6"/></svg>' :
                mat.type === 'link' ?
                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>' :
                '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/></svg>'
              }
            </div>
            <div class="min-w-0">
              <p class="text-xs font-black text-slate-900 truncate">${mat.name}</p>
              <p class="text-[9px] font-black uppercase tracking-widest text-slate-400 capitalize">${mat.type}</p>
            </div>
          </a>
        `).join('');
      } else {
        materialsSection.classList.add('hidden');
      }
    }

    this.modal.classList.remove('hidden');
    this.modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  private closeModal() {
    if (!this.modal) return;
    this.modal.classList.add('hidden');
    this.modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  private addEventListeners() {
    this.saveButton?.addEventListener('click', () => this.handleSave());
    
    // Close on backdrop click
    this.modal?.addEventListener('click', (e) => {
      if (e.target === this.modal) this.closeModal();
    });
  }

  private loadData() {
    const saved = localStorage.getItem('peertutor_reflection');
    if (saved) {
      try {
        const data: ReflectionData = JSON.parse(saved);
        if (this.summaryTextarea) this.summaryTextarea.value = data.summary;
        if (this.goalInput) this.goalInput.value = data.goal;
      } catch (e) {
        console.error('Failed to load saved reflection data', e);
      }
    }
  }

  private async handleSave() {
    if (!this.summaryTextarea || !this.goalInput) return;

    const data: ReflectionData = {
      summary: this.summaryTextarea.value,
      goal: this.goalInput.value
    };

    localStorage.setItem('peertutor_reflection', JSON.stringify(data));

    // Formspree Integration
    try {
      const formData = new FormData();
      formData.append('formType', 'Student Progress Reflection');
      formData.append('summary', data.summary);
      formData.append('goal', data.goal);
      formData.append('studentName', localStorage.getItem('fullName') || 'Unknown Student');

      await fetch('https://formspree.io/f/xqewrgdb', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
    } catch (err) {
      console.error('Formspree error:', err);
    }

    // Feedback
    this.showFeedback();
  }

  private showFeedback() {
    if (!this.saveButton) return;

    const originalText = this.saveButton.textContent;
    const originalBg = this.saveButton.className;

    this.saveButton.textContent = 'Update saved successfully';
    this.saveButton.classList.remove('from-green-500', 'to-teal-600');
    this.saveButton.classList.add('bg-green-600');
    this.saveButton.disabled = true;

    setTimeout(() => {
      if (this.saveButton) {
        this.saveButton.textContent = originalText;
        this.saveButton.className = originalBg;
        this.saveButton.disabled = false;
      }
    }, 2000);
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new ProgressManager());
} else {
  new ProgressManager();
}
