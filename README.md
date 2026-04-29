# PeerTutor

A modern university peer tutoring platform connecting students with expert peer tutors.

## Features

- **Tutor Search:** Find expert peer tutors by course or department.
- **Booking System:** Easily schedule tutoring sessions (Online or On-Campus).
- **Tutor Dashboard:** Tutors can manage their applications, recordings, and profile.
- **Admin Dashboard:** Administrators can oversee tutor applications and academic data.
- **Integrated Feedback:** Students can provide reflections on their progress.
- **Formspree Integration:** All forms are connected to Formspree for easy data collection.

## Tech Stack

- **Vite:** Build tool for front-end development.
- **React:** For building user interfaces.
- **Tailwind CSS:** For modern and responsive styling.
- **Lucide React:** For clean and consistent icons.
- **Motion:** For smooth animations.

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aysoos171-lgtm/Peer.git
   cd Peer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## Deployment

### Netlify
The project is configured for deployment on Netlify. 
A `netlify.toml` file is included with pre-configured build commands and static file redirects.

### Vercel
The project is configured for deployment on Vercel.
A `vercel.json` file is included. To deploy:
1. Connect your GitHub repository to Vercel.
2. Vercel will automatically detect the settings from `vercel.json`.
3. Alternatively, use the Vercel CLI: `vercel deploy`.

## Configuration

- Form submissions are sent to Formspree. Ensure the endpoint in the HTML files matches your active Formspree form ID.
- Environment variables can be configured in a `.env` file (see `.env.example`).
