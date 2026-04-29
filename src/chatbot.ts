// PeerTutor Chatbot Script

class PeerTutorChatbot {
  private container: HTMLDivElement | null = null;
  private chatWindow: HTMLDivElement | null = null;
  private messagesContainer: HTMLDivElement | null = null;
  private inputField: HTMLInputElement | null = null;
  private sendButton: HTMLButtonElement | null = null;
  private isOpen = false;

  private qaPairs = [
    {
      keywords: ['find', 'search', 'look for', 'how can i find'],
      answer: 'Go to Find Tutors, search for your course code or course name, then choose a tutor based on rating, price, reviews, and teaching mode.'
    },
    {
      keywords: ['book', 'booking', 'reserve', 'how do i book'],
      answer: 'Open the tutor profile, choose your package, select Online or Face-to-Face, choose the day and time, then confirm the booking.'
    },
    {
      keywords: ['online', 'teams', 'microsoft teams', 'where are online'],
      answer: 'Online sessions are conducted through Microsoft Teams.'
    },
    {
      keywords: ['face-to-face', 'face to face', 'library', 'd building', 'location'],
      answer: 'Face-to-face sessions are held in the college library from 8:00 AM to 4:00 PM. On Tuesdays, they are held from 12:00 PM to 2:00 PM in D Building rooms.'
    },
    {
      keywords: ['pay', 'cash', 'visa', 'mastercard', 'apple pay', 'payment'],
      answer: 'Cash payment is only available for face-to-face sessions. Online sessions can be paid by Visa/MasterCard or Apple Pay.'
    },
    {
      keywords: ['progress', 'feedback', 'materials', 'recorded lessons', 'see my progress'],
      answer: 'Go to My Progress to see your previous bookings, tutor feedback, progress details, uploaded materials, and recorded lessons.'
    },
    {
      keywords: ['contact tutor', 'message tutor', 'chat', 'talk to tutor'],
      answer: 'Go to your booking details and click Chat to message your tutor directly.'
    },
    {
      keywords: ['become a tutor', 'tutor registration', 'i am a tutor'],
      answer: 'Choose “I am a Tutor,” then complete the tutor registration form with your details, courses, grades, availability, prices, and profile photo.'
    },
    {
      keywords: ['upload', 'recorded lessons', 'video', 'recording'],
      answer: 'Tutors can go to Lesson Recordings and click Upload Lesson Video to upload a recorded session for their students.'
    },
    {
      keywords: ['add a course', 'teach a course', 'new course'],
      answer: 'Tutors can go to My Courses and click Add New Course to Teach, then submit the course details for admin approval.'
    },
    {
      keywords: ['admin', 'manage', 'admins', 'dashboard'],
      answer: 'Admins can view users, bookings, payments, progress, and tutor applications from the Admin Dashboard.'
    },
    {
      keywords: ['help', 'support', 'contact admin'],
      answer: 'You can contact the PeerTutor admins through the Contact Admins section.'
    }
  ];

  constructor() {
    this.init();
  }

  private init() {
    this.createStyles();
    this.createUI();
    this.addEventListeners();
  }

  private createStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .pt-chatbot-fab {
        position: fixed;
        bottom: 24px;
        right: 24px;
        width: 60px;
        height: 60px;
        border-radius: 30px;
        background: #2563eb;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        box-shadow: 0 10px 25px -5px rgba(37, 99, 235, 0.4);
        z-index: 9999;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .pt-chatbot-fab:hover {
        transform: scale(1.1) rotate(5deg);
        background: #1d4ed8;
      }
      .pt-chatbot-window {
        position: fixed;
        bottom: 100px;
        right: 24px;
        width: 380px;
        height: 550px;
        background: white;
        border-radius: 24px;
        box-shadow: 0 20px 50px -12px rgba(0, 0, 0, 0.15);
        z-index: 9998;
        display: none;
        flex-direction: column;
        overflow: hidden;
        border: 1px solid #f1f5f9;
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      }
      .pt-chatbot-window.open {
        display: flex;
        transform: translateY(0);
        opacity: 1;
      }
      .pt-chatbot-header {
        background: #2563eb;
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        gap: 12px;
      }
      .pt-chatbot-header h3 {
        margin: 0;
        font-size: 16px;
        font-weight: 700;
      }
      .pt-chatbot-messages {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        background: #f8fafc;
        max-height: calc(550px - 60px - 73px); /* Header and input area heights */
      }
      .pt-chatbot-msg {
        max-width: 75%;
        padding: 12px 16px;
        border-radius: 16px;
        font-size: 14px;
        line-height: 1.5;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: pre-wrap;
      }
      .pt-chatbot-msg.ai {
        align-self: flex-start;
        background: white;
        color: #1e293b;
        border-bottom-left-radius: 4px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        border: 1px solid #f1f5f9;
      }
      .pt-chatbot-msg.user {
        align-self: flex-end;
        background: #2563eb;
        color: white;
        border-bottom-right-radius: 4px;
      }
      .pt-chatbot-input-area {
        padding: 16px;
        background: white;
        border-top: 1px solid #f1f5f9;
        display: flex;
        gap: 8px;
      }
      .pt-chatbot-input {
        flex: 1;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 10px 16px;
        font-size: 14px;
        outline: none;
        transition: border-color 0.2s;
      }
      .pt-chatbot-input:focus {
        border-color: #2563eb;
      }
      .pt-chatbot-send {
        background: #2563eb;
        color: white;
        border: none;
        border-radius: 12px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background 0.2s;
      }
      .pt-chatbot-send:hover {
        background: #1d4ed8;
      }
      @media (max-width: 480px) {
        .pt-chatbot-window {
          width: calc(100% - 48px);
          height: calc(100% - 140px);
        }
      }
    `;
    document.head.appendChild(style);
  }

  private createUI() {
    // FAB
    this.container = document.createElement('div');
    this.container.className = 'pt-chatbot-fab';
    this.container.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
    `;
    document.body.appendChild(this.container);

    // Window
    this.chatWindow = document.createElement('div');
    this.chatWindow.className = 'pt-chatbot-window';
    this.chatWindow.innerHTML = `
      <div class="pt-chatbot-header">
        <div class="bg-white/20 p-2 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </div>
        <h3>PeerTutor AI Assistant</h3>
      </div>
      <div class="pt-chatbot-messages" id="pt-chatbot-messages">
        <div class="pt-chatbot-msg ai">
          Hello! I’m the PeerTutor AI Assistant. How can I help you today?
        </div>
      </div>
      <div class="pt-chatbot-input-area">
        <input type="text" class="pt-chatbot-input" id="pt-chatbot-input" placeholder="Ask me anything...">
        <button class="pt-chatbot-send" id="pt-chatbot-send">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
        </button>
      </div>
    `;
    document.body.appendChild(this.chatWindow);

    this.messagesContainer = document.getElementById('pt-chatbot-messages') as HTMLDivElement;
    this.inputField = document.getElementById('pt-chatbot-input') as HTMLInputElement;
    this.sendButton = document.getElementById('pt-chatbot-send') as HTMLButtonElement;
  }

  private addEventListeners() {
    this.container?.addEventListener('click', () => this.toggleChat());
    this.sendButton?.addEventListener('click', () => this.handleSendMessage());
    this.inputField?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.handleSendMessage();
    });
  }

  private toggleChat() {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.chatWindow?.classList.add('open');
      if (this.container) {
        this.container.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        `;
      }
    } else {
      this.chatWindow?.classList.remove('open');
      if (this.container) {
        this.container.innerHTML = `
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        `;
      }
    }
  }

  private async handleSendMessage() {
    const text = this.inputField?.value.trim().toLowerCase();
    if (!text) return;

    this.appendMessage(this.inputField?.value || '', 'user');
    if (this.inputField) this.inputField.value = '';

    let responseText = "Sorry, I didn’t understand your question. Please try asking about booking, tutors, or payments.";

    // Find best match
    for (const pair of this.qaPairs) {
      if (pair.keywords.some(keyword => text.includes(keyword))) {
        responseText = pair.answer;
        break;
      }
    }

    // Small delay to feel natural
    setTimeout(() => {
      this.appendMessage(responseText, 'ai');
    }, 300);
  }

  private appendMessage(text: string, sender: 'user' | 'ai'): HTMLDivElement {
    const msg = document.createElement('div');
    msg.className = `pt-chatbot-msg ${sender}`;
    msg.textContent = text;
    this.messagesContainer?.appendChild(msg);
    this.messagesContainer?.scrollTo({ top: this.messagesContainer.scrollHeight, behavior: 'smooth' });
    return msg;
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new PeerTutorChatbot());
} else {
  new PeerTutorChatbot();
}
