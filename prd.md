# **Introduction**

Symphonia represents a transformative solution for the $4.2 billion music education market, addressing the fundamental disconnect between how students actually learn music today and the tools available to educators. By combining professional-grade audio processing with intuitive educational interfaces, we're solving the core problem that has plagued music education for decades: the inability to isolate, manipulate, and interact with individual elements of complex musical arrangements in real-time. This isn't just another EdTech platform—it's the first comprehensive system that treats audio stems as educational building blocks, enabling students to truly hear and understand the intricate layers that make up their favorite songs while giving educators unprecedented control over the learning experience.

The market opportunity is massive and underserved. Traditional music education tools are either too simplistic for serious learning or too complex for classroom adoption, while consumer audio apps lack the pedagogical framework educators need. Symphonia bridges this gap by delivering studio-quality audio manipulation through an interface designed specifically for educational workflows, backed by AI-powered insights that help both students and teachers optimize practice time and identify areas for improvement. The combination of our "un-gated" pricing philosophy—where all features are available across educator tiers—and our FERPA-compliant, parent-friendly architecture positions us to capture market share from both institutional buyers and individual music educators who have been underserved by existing solutions.

Our technical architecture represents the perfect convergence of cutting-edge audio processing and modern web development practices. The integration of Music.ai's comprehensive audio analysis platform with SoundTouchJS's real-time manipulation capabilities, orchestrated through tRPC's type-safe API layer and powered by Trigger.dev's reliable background processing, creates a system that's both technically sophisticated and operationally robust. This infrastructure, combined with Zustand's performant state management, PostHog's educational analytics, and Supabase's real-time collaboration features, delivers the professional-grade reliability that educational institutions demand while maintaining the responsive, delightful user experience that keeps students engaged. We're not just building software—we're architecting the future of music education, where technology amplifies human creativity rather than replacing it.  

# **Architecture**

## **MVP Flow**

A clear, step-by-step process for an educator getting started with a new student:

1. Educator signs up and selects subscription tier based on student count  
2. Educator creates student roster and sends invitation links/codes  
3. Student accepts invitation and creates free account linked to educator  
4. Parent creates account (for minors) with educator-controlled permissions  
5. Educator uploads audio file or imports from public URL (Google Drive, Dropbox, etc) to create new Repertoire item  
6. System automatically processes audio through stem separation and educational analysis  
7. Educator assigns Repertoire item to student with practice instructions  
8. Student practices using IPPI with stem controls, tempo adjustment, and looping  
9. Student leaves timestamped comments/questions on difficult sections  
10. Educator reviews progress analytics and responds to comments  
11. Both track progress over time through visual dashboards

---

## **Launch Features (MVP)**

### **Interactive Practice & Playback Interface (IPPI)**

*Core DAW-like interface enabling students and educators to interact with stemmed audio tracks, adjust tempo/key in real-time, and focus on specific sections for practice*

* Multi-stem audio player with solo/mute/volume/pan controls per track  
* Real-time tempo and key adjustment using SoundTouchJS Audio Worklet for high-quality, low-latency processing without quality degradation  
* Loop functionality with auto-detected song sections  
* Educational overlays (chord charts, synced lyrics, beat markers)  
* Timeline-based commenting system for educator-student collaboration  
* Ensemble/group lesson support with synchronized playback  
* Instrument-agnostic design with universal functionality

#### **Tech Involved**

* Web Audio API for multi-stem audio routing, mixing, and real-time effects processing  
* SoundTouchJS Audio Worklet for professional-grade tempo/pitch manipulation running in isolated audio threads  
* Music.ai platform for stem separation and other server-side audio processing (chord detection, beat map, lyric transcription, etc)  
* React/Next.js for responsive interface  
* Supabase real-time for comment synchronization

#### **Main Requirements**

* Low-latency audio playback and real-time parameter control across all browsers/devices  
* Seamless stem separation processing pipeline  
* Professional-quality tempo/pitch adjustment maintaining audio fidelity during manipulation  
* Mobile-responsive waveform visualization  
* FERPA/GDPR compliant data handling

---

### **Educator Account & Student Management**

*Comprehensive dashboard for educators to manage their student roster, track progress, and handle all administrative tasks in one place*

* Student roster with photos, contact info, and instrument details  
* Invitation system via email or shareable join codes  
* Three-tier permission system: Educator → Student → Parent  
* Progress tracking with visual indicators per student

#### **Tech Involved**

* Supabase Auth for account hierarchy
* Clerk Organizations for educator-student hierarchy and role-based permissions
* Clerk Billing for subscription management and feature gating  
* PostgreSQL for educational data and progress tracking
* Clerk's built-in invitation system for secure onboarding
* SendGrid for custom notification emails

#### **Main Requirements**

* Organization-based multi-tenancy with Clerk's B2B architecture 
* Audit trail for student activity and practice time  
* COPPA-compliant parent controls for minors 
* SOC 2 Type 2 compliance through Clerk's infrastructure 
* Geographic data residency (US-East-1 for MVP)

---

### **Repertoire Management System**

*Central library where educators organize teaching materials, with each piece containing interactive audio, supplementary files, and educational metadata*

* Audio upload or import from public URL (Google Drive, Dropbox, etc) with automatic stem separation processing  
* File attachment system (PDFs, videos, external links)  
* Repertoire sharing controls (private, shared with students, public)  
* Search and filter by instrument, difficulty, genre, etc.

#### **Tech Involved**

* AWS S3 \+ CloudFront for storage of all user-generated & user-uploaded content  
* PostgreSQL for metadata and relationships  
* Music.ai for educational analysis and metadata

#### **Main Requirements**

* Support for large audio files (up to 500MB)  
* Background processing queue for stem separation  
* Version control for repertoire updates

---

### **Assignment & Progress Tracking**

*Tools for educators to create practice assignments and monitor student progress with detailed analytics*

* Assignment creation with specific repertoire items  
* Practice goals (tempo targets, section mastery, time requirements)  
* Automatic practice time logging

#### **Tech Involved**

* PostgreSQL for assignment and progress data

#### **Main Requirements**

* Real-time progress syncing across devices

---

## **User Account Structure**

### **Educator Tiers (All Features Included)**

* **Starter:** Up to 10 students \- $29/month  
* **Growth:** Up to 25 students \- $49/month  
* **Studio:** Up to 50 students \- $79/month  
* **Professional:** Up to 100 students \- $119/month  
* **Institution:** Unlimited students \+ multi-teacher \- $199/month base \+ $29/teacher

### **Student Accounts**

* **Free Student:** Full IPPI access, assigned repertoire only  
* **Student Plus:** $9/month \- Personal repertoire building (10 songs/month)

### **Parent Accounts**

* **Free with educator-controlled permissions:**  
  * View progress (always enabled)  
  * Add comments (educator choice)  
  * Manage scheduling (default enabled)  
  * Payment management (always enabled)  
  * Child scheduling permissions (parent choice)

---

## **API Rate Limiting Strategy**

### **Tiered Approach by Account Type:**

* **Free Students:** No direct API access (use educator's processed content)  
* **Paid Educators:** 50-100 songs/month for stem separation \+ unlimited Music.ai features  
* **Student Plus:** 10 songs/month for personal repertoire building  
* **Enterprise:** Custom limits based on institution size

### **External API Usage:**

* **Music.ai Platform:** Stem separation, educational analysis, chord detection, other server-side audio processing

---

## **Data Architecture & Compliance**

### **Geographic Data Residency:**

* **MVP:** US-East-1 (Virginia) for FERPA compliance  
* **Future:** EU-West-1 (Ireland) for GDPR compliance  
* **Global Routing:** CloudFront with geographic routing

---

## **Future Features (Post-MVP)**

### **Expansions to Interactive Practice & Playback Interface (IPPI)**

* Offline-capable practice mode with cached stems and local processing  
  * Audio playback, tempo/key adjustment, looping, practice time tracking  
* Ensemble/group lesson support with synchronized playback  
* Dual-Engine Stem Comparison with hybrid selection \- A/B test stems from multiple separation engines (Music.ai vs Fadr) with side-by-side playback controls, allowing users to audition and select the best-quality stem for each instrument from either separation, then commit to a hybrid stem collection

#### **Tech Involved**

* Service Worker for offline audio caching  
* WebRTC for real-time group collaboration  
* Fadr Stems API for alternate stem separation engine  
* Enhanced Web Audio API routing for dual-stream stem management  
* Client-side stem comparison and selection logic

#### **Main Requirements**

* Offline practice with sync-on-reconnect for progress data only  
* Real-time collaboration for ensemble lessons  
* A/B stem comparison interface with solo/mute controls for each separation  
* Hybrid stem selection workflow with commit/discard functionality  
* A/B the stems from each separation engine and select the best ones (e.g. vocals and drums from Engine A, bass and melodic from Engine B)

---

### **Expansions to Educator Account & Student Management**

* Robust scheduling system  
* Basic messaging system for educator-student communication  
* Parent portal with permission controls for children students  
* Bulk student import via CSV  
* Ensemble/group management tools

---

### **Expansions to Repertoire Management System**

* YouTube import with educational fair use compliance  
* Curriculum integration (ABRSM, RCM, Suzuki method)  
* Copyright compliance tracking and attribution

#### **Tech Involved**

* yt-dlp for YouTube audio extraction with fair use documentation

#### **Main Requirements**

* Educational fair use documentation automation  
* Curriculum alignment tagging

---

### **Expansions to Assignment & Progress Tracking**

* Progress visualization (charts, heatmaps, milestone tracking)  
* Achievement badges and gamification elements  
* Curriculum milestone tracking  
* Parent progress reports

#### **Tech Involved**

* Posthog for detailed analytics tracking  
* Chart.js for progress visualization  
* Supabase Edge Functions for achievement calculations

#### **Main Requirements**

* Real-time progress syncing across devices  
* Exportable progress reports for parents and institutions  
* Customizable achievement criteria  
* Integration with standard music curricula

---

### **Real-Time Remote Teaching (RT2)**

* Integrated video calling with synchronized IPPI controls  
* Screen sharing with annotation tools  
* Lesson recording with automatic transcription  
* Multi-camera support for instrument instruction  
* AI-powered lesson summaries and homework generation

#### **Tech Involved**

* WebRTC for peer-to-peer video/audio  
* Sonobus integration for low-latency audio  
* AWS Transcribe for lesson transcription  
* OpenAI API for lesson analysis

#### **Main Requirements**

* Sub-50ms audio latency for real-time play-along  
* Automatic bandwidth adaptation  
* Cloud recording storage with privacy controls  
* Frame-accurate synchronization between video and IPPI

---

### **AI Music Generation & Modification**

* Generate backing tracks in any style  
* Create simplified arrangements for beginners  
* Style transfer (classical piece → pop arrangement)  
* Personalized exercise generation based on weaknesses

#### **Tech Involved**

* AI/ML API for music generation models MiniMax Music & Stable Audio  
* Music.ai style transfer modules  
* Custom fine-tuned models for educational content

#### **Main Requirements**

* Copyright-compliant generation  
* Educational licensing for generated content  
* Quality threshold filtering  
* Seamless integration with existing repertoire

---

### **Advanced Analytics & AI Tutoring**

* Learning pattern recognition across student population  
* Predictive analytics for dropout risk  
* Personalized curriculum recommendations  
* Three Minute Theory-style lesson plan generation  
* AI teaching assistant for practice feedback

#### **Tech Involved**

* TensorFlow.js for on-device ML  
* OpenAI GPT-4 for teaching assistance  
* Custom ML models for pattern recognition  
* BigQuery for large-scale analytics

#### **Main Requirements**

* FERPA/COPPA compliance for student data  
* Explainable AI recommendations  
* Teacher override capabilities  
* Curriculum-aligned content generation

---

## **System Architecture**

### **MVP Architecture Priorities:**

1. ✅ **IPPI balance between client-side and server-side audio processing**  
2. ✅ **FERPA compliance architecture**  
3. ✅ **Permission-based multi-user system**  
4. ✅ **Tiered rate limiting**  
5. ✅ **Geographic data residency**

### **Post-MVP Enhancements:**

1. 🔄 Cross-region backup replication  
2. 🔄 Priority processing queues  
3. 🔄 True multi-tenancy for enterprise  
4. 🔄 Offline sync capabilities

### **Storage Strategy:**

* **AWS S3:** User uploads, user-generated audio files, lesson recordings, large PDFs  
* **Supabase Storage:** Application assets, avatars, small files (\<5MB)  
* **CloudFront CDN:** Global content delivery with geographic routing

### **Backup Strategy:**

* **MVP:** Supabase built-in point-in-time recovery (7 days) \+ daily automated backups  
* **Post-MVP:** Cross-region replication for critical student progress data

---

## **Competitive Advantages**

### **"Un-Gated" Platform Philosophy:**

* **No feature restrictions** across educator tiers  
* **Transparent pricing** without hidden costs  
* **Parent-friendly** with clear permission controls  
* **Curriculum-integrated** from day one  
* **Compliance-first** architecture

### **Educational Focus:**

* **Instrument-agnostic** design for universal adoption  
* **Ensemble support** for classroom educators  
* **Offline-capable** for reliable practice sessions (post-MVP)  
* **Copyright-compliant** YouTube integration (post-MVP)  
* **Standards-aligned** curriculum integration

# **Design System**

## **Color Palette**

### **Primary Colors**

**Primary Mint Green** \- \#00eba4 (Core brand color for primary actions, key UI elements, and brand identity) **Primary Dark** \- \#0F172A (Dark theme background and high-contrast text elements)

### **Secondary Colors**

**Secondary Mint Light** \- \#34F5C4 (Hover states and lighter brand applications) **Secondary Mint Pale** \- \#E8FFFE (Subtle backgrounds and selection states) **Secondary Dark Slate** \- \#1E293B (Secondary dark surfaces and cards)

### **Accent Colors**

**Accent Cyan** \- \#06B6D4 (Interactive elements, links, and progress indicators) **Accent Purple** \- \#8B5CF6 (Creative features, AI-powered tools, and generation workflows) **Accent Orange** \- \#FB7185 (Notifications, alerts, and collaborative features)

### **Functional Colors**

**Success Green** \- \#10B981 (Successful operations, completed lessons, practice achievements) **Warning Amber** \- \#F59E0B (Warnings, pending states, and attention-required items) **Error Red** \- \#EF4444 (Errors, destructive actions, and critical alerts) **Info Blue** \- \#3B82F6 (Information states, tips, and educational content)

### **Neutral Colors**

**Text Primary** \- \#F8FAFC (Primary text in dark theme) **Text Secondary** \- \#CBD5E1 (Secondary text and supporting information) **Text Muted** \- \#64748B (Placeholder text and disabled states) **Border** \- \#334155 (Subtle borders and dividers)

### **Background Colors**

**Background Primary** \- \#0F172A (Main app background) **Background Secondary** \- \#1E293B (Card backgrounds and elevated surfaces) **Background Tertiary** \- \#334155 (Input backgrounds and subtle surfaces) **Background Overlay** \- \#000000/50 (Modal overlays and backdrop)

## **Typography**

### **Font Family**

**Primary Font**: Inter (All platforms) **Fallback**: \-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### **Font Weights**

* **Regular**: 400  
* **Medium**: 500  
* **Semibold**: 600  
* **Bold**: 700  
* **Extrabold**: 800

### **Text Styles**

#### **Headings**

**H1**: 32px/40px, Bold, Letter spacing \-0.3px *Used for main page titles and primary headers*

**H2**: 24px/32px, Semibold, Letter spacing \-0.2px *Used for section headers and feature titles*

**H3**: 20px/28px, Semibold, Letter spacing \-0.1px *Used for card titles and subsection headers*

**H4**: 18px/24px, Medium, Letter spacing 0px *Used for component titles and important labels*

#### **Body Text**

**Body Large**: 16px/24px, Regular, Letter spacing 0px *Primary reading text for content and descriptions*

**Body**: 14px/20px, Regular, Letter spacing 0px *Standard UI text for most interface elements*

**Body Small**: 12px/16px, Medium, Letter spacing 0.1px *Supporting text, metadata, and secondary information*

#### **Special Text**

**Caption**: 11px/16px, Medium, Letter spacing 0.2px, Text Muted *Timestamps, status indicators, and micro-labels*

**Button Text**: 14px/20px, Medium, Letter spacing 0.1px *All button text across the application*

**Label**: 12px/16px, Semibold, Letter spacing 0.3px, Text Secondary *Form labels and category identifiers*

## **Component Styling**

### **Buttons**

#### **Primary Button**

* **Background**: Primary Mint Green (\#00eba4)  
* **Text**: Primary Dark (\#0F172A)  
* **Height**: 44px  
* **Corner Radius**: 8px  
* **Padding**: 20px horizontal, 12px vertical  
* **Hover**: Secondary Mint Light background  
* **Active**: Scale 98%, slight shadow

#### **Secondary Button**

* **Border**: 1.5px Primary Mint Green (\#00eba4)  
* **Text**: Primary Mint Green (\#00eba4)  
* **Background**: Transparent  
* **Height**: 44px  
* **Corner Radius**: 8px  
* **Hover**: Background Tertiary with mint tint

#### **Tertiary Button**

* **Text**: Text Primary (\#F8FAFC)  
* **Background**: Background Secondary (\#1E293B)  
* **Height**: 40px  
* **Corner Radius**: 6px  
* **Hover**: Background Tertiary

**Inverse Tertiary Button**

* **Text**: Primary Dark (\#0F172A)  
* **Background**: Text Primary (\#F8FAFC)  
* **Height**: 40px  
* **Corner Radius**: 6px  
* **Hover**: Background with slight opacity reduction (90%)  
* **Transition**: 200ms ease-out

### **Cards**

#### **Standard Card**

* **Background**: Background Secondary (\#1E293B)  
* **Border**: 1px Border (\#334155)  
* **Shadow**: 0 4px 12px rgba(0, 0, 0, 0.15)  
* **Corner Radius**: 12px  
* **Padding**: 24px

#### **Interactive Card**

* **Hover**: Subtle mint glow border  
* **Transition**: 200ms ease-out  
* **Active**: Scale 99%

### **Input Fields**

#### **Text Input**

* **Height**: 48px  
* **Corner Radius**: 8px  
* **Border**: 1px Border (\#334155)  
* **Background**: Background Tertiary (\#334155)  
* **Text**: Text Primary (\#F8FAFC)  
* **Placeholder**: Text Muted (\#64748B)  
* **Focus**: 2px Primary Mint Green border with glow  
* **Padding**: 16px horizontal

#### **Select Input**

* **Height**: 48px  
* **Corner Radius**: 8px  
* **Background**: Background Tertiary (\#334155)  
* **Chevron**: Text Secondary color  
* **Focus**: Primary Mint Green border

### **Audio Player Components**

#### **Multi-Track Timeline Display**

##### **Track Container**

* **Background**: Background Secondary (\#1E293B)  
* **Border**: 1px Border (\#334155) between tracks  
* **Height**: 80px per track  
* **Padding**: 12px vertical, 16px horizontal

##### **Waveform Visualization**

* **Active State**: Primary Mint Green (\#00eba4) with 80% opacity  
* **Inactive/Muted State**: Text Muted (\#64748B) with 40% opacity  
* **Background**: Background Tertiary (\#334155)  
* **Waveform Lines**: 1-2px width, varying heights based on amplitude  
* **Smooth Gradients**: Subtle fade from solid to transparent at edges

#### **Track Control Panel (Left Sidebar)**

##### **Track Label**

* **Typography**: 14px/20px, Medium, Text Primary  
* **Icon Size**: 20px x 20px, Text Secondary color  
* **Container**: Background Secondary with 8px padding  
* **Spacing**: 8px between icon and label

##### **Mute/Solo Controls**

* **M Button (Mute)**:  
  * **Default**: Background Tertiary (\#334155), Text Secondary  
  * **Active**: Functional Warning (\#F59E0B), white text  
  * **Size**: 24px x 24px, 4px corner radius  
* **S Button (Solo)**:  
  * **Default**: Background Tertiary (\#334155), Text Secondary  
  * **Active**: Primary Mint Green (\#00eba4), Primary Dark text  
  * **Size**: 24px x 24px, 4px corner radius

##### **Volume Control Slider**

* **Track**: Background Tertiary (\#334155), 3px height, rounded ends  
* **Thumb**: Background Primary (\#F8FAFC), 16px diameter  
* **Progress**: Primary Mint Green (\#00eba4)  
* **Container**: 120px width, centered alignment

#### **Playhead & Timeline Navigation**

##### **Playhead Indicator**

* **Line**: 2px width, Text Primary (\#F8FAFC) color  
* **Extends**: Full height of visible tracks  
* **Drop Shadow**: 0 0 8px rgba(248, 250, 252, 0.3)

##### **Timeline Ruler**

* **Background**: Background Primary (\#0F172A)  
* **Tick Marks**: Text Muted (\#64748B), 1px width  
* **Time Labels**: 12px/16px, Medium, Text Secondary  
* **Height**: 32px

#### **Section Selection & Loop Controls**

##### **Selection Overlay**

* **Background**: Primary Mint Green (\#00eba4) with 15% opacity  
* **Borders**: 2px solid Primary Mint Green on start/end  
* **Resize Handles**: 8px width, Primary Mint Green background  
* **Corner Radius**: 4px on handles

##### **Smart Metronome Panel**

* **Container**: Background Secondary (\#1E293B), 12px corner radius  
* **Border**: 1px Border (\#334155)  
* **Tempo Display**: 20px/28px, Semibold, Text Primary  
* **BPM Label**: 12px/16px, Medium, Text Secondary  
* **Status Indicator**: 8px diameter dot, Success Green when active

#### **Track State Indicators**

##### **Active Track Highlighting**

* **Left Border**: 4px solid Primary Mint Green (\#00eba4)  
* **Background Tint**: Primary Mint Green with 5% opacity  
* **Smooth Transition**: 200ms ease-out

##### **Muted Track Styling**

* **Waveform**: Text Muted (\#64748B) with 30% opacity  
* **Track Label**: Text Muted with strikethrough effect  
* **Visual Feedback**: Subtle pulse animation when muting/unmuting

#### **Transport Controls**

##### **Play/Pause Button**

* **Size**: 48px diameter  
* **Background**: Primary Mint Green (\#00eba4)  
* **Icon**: Primary Dark (\#0F172A), 24px size  
* **Hover**: Secondary Mint Light (\#34F5C4)  
* **Active**: Scale 95% with subtle glow

##### **Skip Controls**

* **Size**: 40px diameter  
* **Background**: Background Secondary (\#1E293B)  
* **Icon**: Text Primary (\#F8FAFC), 20px size  
* **Hover**: Background Tertiary (\#334155)

##### **Progress Scrubber**

* **Track**: Background Tertiary (\#334155), 4px height  
* **Progress**: Primary Mint Green (\#00eba4)  
* **Thumb**: 16px diameter, Text Primary color  
* **Time Display**: 14px/20px, Medium, Text Secondary

#### **Feature Toggle Buttons**

##### **Secondary Feature Buttons** (Lyrics, Chords, Sections)

* **Default State**:  
  * **Background**: Background Tertiary (\#334155)  
  * **Text**: Text Secondary (\#CBD5E1)  
  * **Border**: 1px Border (\#334155)  
  * **Height**: 36px, 6px corner radius  
* **Active State**:  
  * **Background**: Primary Mint Green (\#00eba4) with 15% opacity  
  * **Text**: Primary Mint Green (\#00eba4)  
  * **Border**: 1px Primary Mint Green  
* **Icon Integration**: 16px icons with 8px spacing from text

#### **Volume & Pan Controls**

##### **Volume Tooltip Display**

* **Background**: Background Primary (\#0F172A) with 90% opacity  
* **Border**: 1px Primary Mint Green (\#00eba4)  
* **Typography**: 12px/16px, Medium, Text Primary  
* **Positioning**: 8px offset from control element  
* **Arrow**: 6px triangle pointer, matching border color

##### **Pan Control Knob**

* **Track**: Background Tertiary (\#334155), 3px height  
* **Center Indicator**: 2px width line, Text Secondary  
* **Active Thumb**: Primary Mint Green (\#00eba4), 14px diameter  
* **Value Display**: Appears on hover/drag, same styling as volume tooltip

#### **Interactive States & Feedback**

##### **Hover States**

* **Tracks**: Subtle Primary Mint Green glow (2px, 10% opacity)  
* **Controls**: 200ms transition to lighter background  
* **Waveforms**: Slight brightness increase (110%)

##### **Loading States**

* **Processing Tracks**: Pulsing Primary Mint Green overlay  
* **Stem Separation**: Animated wave pattern in Accent Purple  
* **Progress Indicators**: Linear gradient animation

##### **Error States**

* **Failed Tracks**: Functional Error (\#EF4444) left border  
* **Warning Icons**: 16px, Functional Warning color  
* **Retry Buttons**: Secondary button styling with Error accent

## **Icons**

### **Icon Sizes**

* **Micro Icons**: 16px x 16px (inline with text)  
* **Small Icons**: 20px x 20px (buttons, inputs)  
* **Standard Icons**: 24px x 24px (navigation, actions)  
* **Large Icons**: 32px x 32px (features, emphasis)

### **Icon Colors**

* **Primary**: Primary Mint Green (\#00eba4) for active/interactive states  
* **Secondary**: Text Secondary (\#CBD5E1) for inactive states  
* **Accent**: Accent Purple (\#8B5CF6) for AI/creative features  
* **Functional**: Respective functional colors for status indicators

## **Spacing System**

* **2px** \- Micro spacing (text line adjustments)  
* **4px** \- Tiny spacing (icon-text gaps)  
* **8px** \- Small spacing (tight element grouping)  
* **12px** \- Default inner spacing (button padding, card internal spacing)  
* **16px** \- Standard spacing (between related elements)  
* **24px** \- Medium spacing (between sections)  
* **32px** \- Large spacing (major content separation)  
* **48px** \- Extra large spacing (page margins, major sections)  
* **64px** \- Maximum spacing (screen-level separations)

## **Motion & Animation**

### **Transition Timing**

* **Micro**: 150ms, ease-out (hover states, button feedback)  
* **Standard**: 250ms, ease-out (modal open/close, card interactions)  
* **Emphasis**: 350ms, spring curve (page transitions, major state changes)  
* **Audio Visual**: 100ms, linear (real-time audio feedback, waveform updates)

### **Animation Curves**

* **Standard Ease**: cubic-bezier(0.4, 0.0, 0.2, 1\)  
* **Emphasis Spring**: cubic-bezier(0.34, 1.56, 0.64, 1\)  
* **Sharp**: cubic-bezier(0.4, 0.0, 0.6, 1\)

### **Special Animations**

* **AI Generation**: Pulsing mint glow during processing  
* **Practice Mode**: Rhythmic color shifts matching tempo  
* **Achievement**: Confetti burst in mint and purple colors  
* **Error States**: Gentle shake with red accent flash

## **Educational Context Styling**

### **Progress Indicators**

* **Mastery Level**: Gradient from Accent Cyan to Primary Mint Green  
* **Practice Streak**: Accent Orange with flame iconography  
* **Skill Points**: Accent Purple with sparkle effects

### **Collaborative Elements**

* **Teacher Comments**: Accent Orange border-left  
* **Student Responses**: Primary Mint Green border-left  
* **AI Suggestions**: Accent Purple border-left with subtle glow

### **Status Indicators**

* **Online Status**: Success Green dot  
* **Practicing**: Pulsing Primary Mint Green  
* **Needs Attention**: Warning Amber  
* **Completed**: Success Green checkmarkI've created a comprehensive design system for your music education platform that captures the essence of your unified approach while maintaining the dark, professional aesthetic you requested. Here are the key highlights:

## **🎯 Design Philosophy**

The system balances **bold simplicity** with **educational functionality**, using your signature mint green (\#00eba4) as the primary brand color against a sophisticated dark theme. The design emphasizes:

* **Clarity for educators** \- Clean information hierarchy for managing multiple students  
* **Engagement for students** \- Interactive elements that make learning feel dynamic  
* **Professional credibility** \- Polished interface that teachers can confidently use with parents/administrators

## **🎨 Color Strategy**

* **Primary Mint Green (\#00eba4)** \- Your brand anchor for key actions and identity  
* **Accent Purple (\#8B5CF6)** \- Specifically for AI/creative features to distinguish them  
* **Accent Orange (\#FB7185)** \- For collaborative elements and teacher-student interactions  
* **Functional colors** \- Success, warning, error states optimized for educational contexts

## **📱 Component Design**

The system includes specialized components for your unique use cases:

* **Audio player controls** with stem isolation buttons  
* **Collaborative comment threads** with role-based color coding  
* **Progress indicators** that work for both individual practice and class management  
* **Status indicators** for real-time teaching scenarios

The interactive demo above shows how these elements work together to create a cohesive, professional platform that differentiates you from both generic education tools and consumer music apps.

This design system will scale beautifully from your desktop MVP to mobile apps while maintaining the sophisticated, unified experience that sets you apart in the music education market.

# **Design Brief**

This design brief outlines the UI/UX specifications for a comprehensive music education platform that unifies student management, interactive audio processing, and AI-powered lesson planning. The platform serves educators, students, and self-learners with a sophisticated dark-themed interface emphasizing both professional credibility and engaging interaction.

## **Interactive Practice & Playback Interface (IPPI) – Main Audio Workspace**

### **Layout Architecture**

#### **Base Application Structure**

* **Left Navigation**: Fixed 280px width sidebar containing:  
  * Repertoire browser with search and recent items  
  * Quick actions (upload, import, create playlist)  
  * User account settings and subscription status  
* **Center Content**: Flexible workspace (minimum 600px) with intelligent layout system  
* **Right Panel**: Collapsible 320px sidebar featuring:  
  * Student roster with online status indicators  
  * Active comment threads and notifications  
  * Session controls and recording options

  ### **Initial Load State**

* **Loading Animation**: Soft pulsing mint glow around entire center content area with "Processing stems..." text in Body Small, using Accent Purple for AI processing indication  
* **Skeleton Layout**:  
  * Left nav: Populated with static navigation elements  
  * Center content: Dark containers with subtle shimmer effects showing where waveform, stem controls, and timeline will appear  
  * Right panel: Collapsed by default, expandable on demand  
* **Progress Indicator**: Linear progress bar in Primary Mint Green showing stem separation completion (0-100%) positioned at top of center content  
* **Error Recovery**: If processing fails, show gentle Error Red border around center content with retry button using Secondary Button styling

  ### **Standard Practice Mode \- Single Pane View**

  #### **Primary Audio Interface (Default Layout)**

* **Waveform Display**:

  * Background: Background Secondary (\#1E293B)  
  * Border: 1px Border (\#334155) with 12px corner radius  
  * Waveform: Primary Mint Green (\#00eba4) with 80% opacity for active state  
  * Current Position: Secondary Mint Light (\#34F5C4) highlighting  
  * Height: 120px on desktop, 80px on mobile  
  * Interactive scrubbing with immediate visual feedback (100ms linear transitions)  
  * Timeline markers showing sections, beats, and chord changes as subtle vertical lines: Text Muted (\#64748B) vertical lines at 1px width  
* **Stem Control Grid**:

  * Desktop: 2x4 grid layout positioned above waveform  
  * Mobile: Horizontal scrollable row with snap-scroll behavior  
  * Button dimensions: 32px height x auto width  
  * Default state: Background Tertiary (\#334155) with 1px Border (\#334155)  
  * Active state: Primary Mint Green (\#00eba4) background with Primary Dark (\#0F172A) text  
  * Muted state: Text Muted (\#64748B) with strikethrough effect and 30% opacity  
  * Solo state: All non-solo stems at 30% opacity with 4px Primary Mint Green left border  
* **Transport Controls**:

  * Bottom-anchored control bar  
  * Play/pause button: 48px diameter with Primary Mint Green (\#00eba4) background and Primary Dark (\#0F172A) icon  
  * Hover state: Secondary Mint Light (\#34F5C4) background with 200ms transition  
  * Active state: Scale 95% with subtle Primary Mint Green glow  
  * Loop toggle: When active, use Primary Mint Green with 15% opacity background and Primary Mint Green text/border  
  * Tempo/key sliders:   
    * Track: Background Tertiary (\#334155), 3px height  
    * Thumb: Text Primary (\#F8FAFC), 16px diameter  
    * Progress: Primary Mint Green (\#00eba4)  
  * Time display: Current position and total duration in Body Small  
* **Layout Toggle Interface**:

  * Floating toolbar in top-right corner of center content  
  * Rounded pill design (Background Secondary, 8px radius, subtle shadow)  
  * Icons: Single pane, horizontal split, vertical split, quad view  
  * Container: Background Secondary (\#1E293B) with 1px Border (\#334155), 8px radius  
  * Hover States: Primary Mint Green (\#00eba4) highlights with 200ms ease-out transition  
  * Active State: Primary Mint Green background with Primary Dark text

  ### **Flexible Layout System \- Split Views**

#### **Split Handle Styling:**

* #### Default: 4px width, Background Tertiary (`#334155`)

* #### Hover: Primary Mint Green (`#00eba4`) with subtle glow effect

* #### Active: Secondary Mint Light (`#34F5C4`) while dragging

#### **Educational Content Panes:**

* #### Tab Active State: Primary Mint Green (`#00eba4`) with 15% opacity background and Primary Mint Green text

* #### Tab Inactive State: Background Tertiary (`#334155`) with Text Secondary (`#CBD5E1`)

  #### **Horizontal Split Configuration**

  ##### **Top/Bottom Split (Adjustable Ratios)**

* **Educational Content Pane (Top)**:

  * Tabbed interface with smooth 200ms transitions between content types  
  * **Chord Charts Tab**:  
    * Real-time chord detection display with guitar/piano fingering diagrams  
    * Interactive chord timeline with click-to-jump functionality  
    * Chord transition animations (200ms ease-out)  
  * **Sheet Music Tab**:  
    * PDF viewer with synchronized playback highlighting  
    * Auto-page turning and measure-level highlighting in Secondary Mint Light  
    * Zoom controls and annotation tools  
  * **Lyrics Tab**:  
    * Large text display with word-level highlighting  
    * Auto-scroll to keep current line centered  
    * Click any line to jump to that timestamp  
  * **Materials Tab**:  
    * User-uploaded PDFs, images, videos with annotation capabilities  
    * Multi-format support with embedded viewers  
* **Audio Interface Pane (Bottom)**:

  * Compact waveform: 64px height with essential visual information  
  * Stem controls: Condensed horizontal pills with quick mute/solo  
  * Inline transport: Play controls integrated with waveform timeline  
  * Split handle: 4px draggable divider with Primary Mint Green hover state

  #### **Vertical Split Configuration**

  ##### **Left/Right Split (Adjustable Ratios)**

* **Educational Content Pane (Left/Right)**:

  * Full-height content area optimized for reading and viewing  
  * **Chord Progression View**: Vertical timeline showing chord changes with precise timing  
  * **Lyrics Panel**: Scrollable with current section highlighting  
  * **Practice Notes**: Real-time annotation space with collaborative editing  
* **Audio Interface Pane (Right/Left)**:

  * Vertical stem control stack for better touch accessibility  
  * Waveform maintains 80px height with timeline markers  
  * Side-mounted transport controls positioned alongside waveform

  #### **Quad Split View (Advanced Layout)**

* **Four-Pane Configuration**:  
  * Top-left: Chord charts with real-time detection  
  * Top-right: Sheet music with synchronized highlighting  
  * Bottom-left: Lyrics with syllable-level sync  
  * Bottom-right: Compact audio controls with mini waveform  
* **Pane Focus System**: Click any pane to temporarily expand to 70% while others shrink  
* **Smart Content Suggestions**: AI recommends optimal content distribution based on song analysis

  ### **Educational Overlays & Content Components**

  #### **Chord Chart Integration**

* **Real-Time Mode**:  
  * Current chord display with large, clear fingering diagrams  
  * Chord timeline bar showing progression with beat-accurate positioning  
  * Difficulty adaptation: Simple triads for beginners, complex jazz notation for advanced  
* **Static Chart Mode**:  
  * User-uploaded chord charts with zoom and annotation capabilities  
  * Sync point markers to align chart sections with audio timeline  
  * Practice loop creation directly from chart selections

  #### **Synchronized Lyrics Display**

* **Karaoke-Style Highlighting**:  
  * Line-by-line highlighting with Secondary Mint Pale background  
  * Word-level precision with syllable timing  
  * Smooth auto-scroll behavior keeping current content centered  
* **Interactive Features**:  
  * Click-to-jump navigation to any lyric line  
  * Practice markers for difficult vocal sections  
  * Optional melody line overlay showing pitch contour

  #### **Sheet Music Viewer**

* **PDF Integration**:  
  * High-quality rendering with page synchronization  
  * Current measure highlighting with mint green overlay  
  * Smart zoom with fit-to-width and fit-to-height options  
* **Interactive Elements**:  
  * Playback cursor showing exact position  
  * Clickable measures for instant navigation  
  * Section markers for structural navigation

  ### **Loop Selection Mode**

* **Timeline Interaction**:  
  * Click-drag selection with Primary Mint Green highlight overlay  
  * Snap-to-section and snap-to-beat functionality for precise loop boundaries  
  * Visual feedback  
    * Selection Overlay: Primary Mint Green (\#00eba4) with 15% opacity (not generic highlight)  
    * Endpoint Brackets: 2px solid Primary Mint Green with 8px resize handles  
    * Duration Display: Background Primary (\#0F172A) with 90% opacity, 1px Primary Mint Green border  
* **Loop Indicators**:  
  * Rounded brackets at endpoints with 250ms spring animation  
  * Loop counter and crossfade controls in sliding bottom panel  
* **Auto-Section Detection**:  
  * AI-suggested sections appear as subtle Secondary Mint Light overlays  
  * "Click to select" micro-copy with gentle pulse animation  
  * Smart suggestions based on song structure analysis

  ### **Collaborative Comment Mode**

* **Comment Thread Integration**:  
  * **Teacher Comments**: Accent Orange left border (4px width) with educator badge  
  * **Student Responses**: Primary Mint Green left border with student avatar  
  * **AI Suggestions**: Accent Purple left border with subtle animated glow  
  * **Comment Pins**: Match respective border colors with 150ms scale animation on interaction  
* **Timeline Anchors**:  
  * Comment pins as small circles with expand-on-hover previews  
  * Color-coded by comment type for quick visual scanning  
  * Smooth 150ms scale animation on interaction  
* **Real-Time Features**:  
  * Live typing indicators with user avatars  
  * New comments fade in with 350ms spring curve animation  
  * Audio annotations with embedded mini-player controls

  ### **Mobile Responsive Adaptations**

  #### **Portrait Mode (\<768px)**

* **Single-Pane Priority**:

  * Educational content accessible via bottom sheet interface  
  * Swipe up gesture reveals content overlay with tab navigation  
  * Full-screen audio interface remains primary focus  
* **Gesture Navigation**:

  * Swipe up: Access educational content bottom sheet  
  * Pinch-to-zoom: Waveform detail view with precise scrubbing  
  * Horizontal swipe: Navigate between educational content tabs  
  * Double-tap: Quick play/pause without hitting transport controls  
* **Bottom Sheet Interface**:

  * Educational content in sliding drawer with 24px corner radius  
  * Persistent handle for easy access and dismissal  
  * Snap points at 30%, 60%, and 90% screen height  
  * Handle: Background Tertiary (\#334155), 32px width x 4px height, 2px corner radius  
  * Background: Background Secondary (\#1E293B) with 1px top border (\#334155)  
  * Snap Points Visual: Subtle Primary Mint Green indicators at snap positions  
* **Optimized Controls**:

  * Stem controls: Horizontal scrollable row with haptic feedback  
  * Transport: Larger 56px play button for thumb accessibility  
  * Timeline: Full-width scrubber with enhanced touch targets  
  * Large Play Button: 56px diameter for mobile with same color scheme as desktop  
  * Enhanced Touch Targets: Minimum 44px with Primary Mint Green hover states  
  * Haptic Feedback: Coordinate with Primary Mint Green visual feedback

  #### **Landscape Mode (768px-1024px)**

* **Hybrid Layout**:  
  * Simplified horizontal split option only  
  * Educational content in left/right panels  
  * Audio interface maintains desktop-like functionality  
* **Touch Optimization**:  
  * All interactive elements minimum 44px for finger accessibility  
  * Larger tap targets for stem controls and transport  
  * Gesture shortcuts for common actions

  #### **Tablet Adaptations**

* **Split View Support**:  
  * Horizontal splits only to maintain usability  
  * Simplified layout controls with larger touch targets  
  * Smart content adaptation based on available screen space

  ### **Advanced Features & States**

  #### **Performance Optimization**

* **Lazy Loading**: Educational content loads on-demand when pane becomes visible  
* **Audio Streaming**: Progressive audio loading with quality adaptation  
* **Responsive Images**: Dynamic image sizing for chord charts and sheet music  
* **Memory Management**: Automatic cleanup of unused audio buffers and DOM elements

  #### **Accessibility Features**

* **Screen Reader Support**:  
  * Comprehensive ARIA labels for all interactive elements  
  * Audio timeline described with time markers and section labels  
  * Stem control states clearly announced  
* **Keyboard Navigation**:  
  * Full tab order through all interface elements  
  * Spacebar for play/pause, arrow keys for timeline navigation  
  * Keyboard shortcuts for layout switching and content access  
* **Visual Accessibility**:  
  * High contrast mode with enhanced color ratios  
  * Reduced motion options for users with vestibular disorders  
  * Scalable text options maintaining layout integrity

  #### **Error States & Edge Cases**

* **Network Issues**:  
  * Smart degradation when real-time features unavailable  
  * Clear error messaging with retry options  
* **Audio Processing Failures**:  
  * Fallback to original audio when stem separation fails  
  * Alternative processing options with different quality levels  
  * User notification with explanation and alternatives  
* **Content Load Failures**:  
  * Graceful degradation when educational content unavailable  
  * Placeholder content with option to retry or upload alternatives  
  * Maintain core audio functionality regardless of content issues  
* **Styling:**  
  * Error Borders: Functional Error (\#EF4444) replacing any error red references  
  * Retry Buttons: Use our Secondary Button styling with Error accent  
  * Loading States: Accent Purple (\#8B5CF6) for AI processing instead of generic purple

---

## **Educator Account & Student Management**

### **Dashboard Overview**

#### **First-Time Setup State**

* **Welcome Animation**: Gentle fade-in sequence introducing key features with Primary Mint Green accent animations  
* **Setup Wizard**: Three-step process using Standard Card styling with progress indicators  
* **Call-to-Action**: Primary Button prompting "Add Your First Student" with celebratory micro-animation

#### **Active Roster View**

* **Student Grid**:  
  * Card-based layout using Interactive Card styling  
  * Student photos: 48px circular avatars with Success Green online indicators  
  * Practice status: Color-coded dots (Success Green for completed, Warning Amber for behind)  
  * Quick actions: Hover reveals message and assignment buttons with 200ms ease-out  
* **Search & Filter**:  
  * Sticky header with Text Input styling  
  * Filter chips using Tertiary Button design with active states in Primary Mint Green  
* **Bulk Actions**:  
  * Multi-select with checkbox animations (150ms ease-out)  
  * Floating action bar slides up with bulk operation buttons

#### **Student Detail Modal**

* **Full-Screen Overlay**: Background Overlay with 350ms spring curve entrance  
* **Split Layout**: Left sidebar with student info, right panel showing practice history  
* **Progress Visualization**:  
  * Linear progress bars for each piece using gradient from Accent Cyan to Primary Mint Green  
  * Practice time charts with mint-colored data points  
  * Achievement badges with Accent Purple sparkle effects  
* **Communication Panel**: Direct message thread with real-time typing indicators

### **Student Invitation Flow**

#### **Invitation Creation**

* **Multi-Step Form**: Clean form design using Input Field styling  
* **Batch Invitations**: Ability to add multiple emails with tag-style input chips  
* **Preview Panel**: Shows invitation email preview with brand styling

#### **Join Code Generation**

* **QR Code Display**: Large, scannable code with Primary Mint Green accents  
* **Code Sharing**: Copy-to-clipboard with Success Green confirmation animation  
* **Expiration Timer**: Countdown with Warning Amber color as deadline approaches

---

## **Repertoire Management System**

### **Library Grid View**

#### **Empty State**

* **Illustration**: Custom music-themed graphic in Primary Mint Green with encouraging micro-copy  
* **Upload Prompt**: Large dashed-border drop zone with Primary Button for file selection  
* **Quick Start**: Suggested repertoire templates with one-click import

#### **Populated Library**

* **Masonry Grid**: Responsive card layout adapting to content  
* **Repertoire Cards**:  
  * Background: Background Secondary with subtle hover glow  
  * Audio waveform preview: Micro waveform in Primary Mint Green  
  * Metadata overlay: Instrument, difficulty, duration in Body Small  
  * Processing status: Pulsing Accent Purple border during stem separation  
* **Filter Sidebar**:  
  * Collapsible on mobile using slide animation  
  * Checkbox groups with Primary Mint Green selections  
  * Search with real-time filtering (150ms debounce)

#### **Upload & Processing Flow**

* **File Drop Zone**:  
  * Drag-over state: Primary Mint Green dashed border with scale animation  
  * Multiple file support with individual progress indicators  
  * Error handling: Gentle shake animation with Error Red accent  
* **Processing Queue**:  
  * Bottom-anchored progress panel showing all processing jobs  
  * Individual stem separation progress with AI generation pulsing effect  
  * Completion notifications with Success Green checkmark animation

### **Individual Repertoire Detail**

#### **Main Content View**

* **Header Section**:  
  * Large audio waveform with embedded play controls  
  * Metadata grid: Instrument, key, tempo, difficulty using Label styling  
  * Action buttons: Edit, share, duplicate with appropriate button hierarchy  
* **Tabbed Interface**:  
  * Audio: Embedded IPPI with simplified controls  
  * Attachments: File grid with download/preview capabilities  
  * Analytics: Student practice data and progress charts  
  * Comments: Educator notes and student feedback threads

#### **Sharing Controls Modal**

* **Permission Matrix**: Toggle switches for different access levels  
* **Student Selection**: Multi-select with search and recently-taught suggestions  
* **Link Generation**: Shareable URLs with expiration settings

---

## **Assignment & Progress Tracking**

### **Assignment Creation Wizard**

#### **Step 1: Repertoire Selection**

* **Library Browser**: Simplified version of main repertoire view  
* **Recent Items**: Quick-access carousel with recently taught pieces  
* **Search Integration**: Real-time search with filtering by student skill level

#### **Step 2: Goal Setting**

* **Practice Targets**:  
  * Tempo sliders with current/target BPM display  
  * Section mastery checkboxes with visual progress indicators  
  * Time-based goals with calendar picker integration  
* **Difficulty Adaptation**: AI suggestions for modifying piece difficulty based on student level  
* **Custom Instructions**: Rich text editor with audio annotation capabilities

#### **Step 3: Distribution**

* **Student Selection**: Multi-select with individual customization options  
* **Scheduling**: Date picker with recurring assignment options  
* **Notification Settings**: Toggle for email/in-app notifications to students and parents

### **Progress Dashboard**

#### **Class Overview**

* **Heat Map Visualization**: Color-coded grid showing practice completion across all students  
* **Activity Stream**: Real-time feed of student practice sessions with timestamps  
* **Alert Center**: Flagged items requiring teacher attention (students behind, technical issues)

#### **Individual Student Progress**

* **Practice Timeline**: Chronological view of practice sessions with duration and quality metrics  
* **Skill Progression**: Spider chart showing growth across different musical competencies  
* **Challenge Areas**: AI-identified sections where student struggles, with suggested interventions  
* **Achievement Gallery**: Visual celebration of completed goals and milestones with confetti animations

### **Real-Time Practice Monitoring**

#### **Live Session View**

* **Student Status Grid**: Real-time indicators showing who's currently practicing  
* **Live Audio Monitoring**: Optional feature to listen in on practice sessions (with permissions)  
* **Instant Feedback**: Push notifications and encouragement messages during practice  
* **Session Analytics**: Live updating of practice quality metrics and focus areas

---

## **Design System Integration**

### **Animation Language**

* **Micro-interactions**: 150ms ease-out for hover states and button feedback  
* **Page transitions**: 350ms spring curves for modal appearances and screen changes  
* **Real-time feedback**: 100ms linear for audio-responsive elements like waveforms  
* **Achievement celebrations**: Burst animations with Primary Mint Green and Accent Purple confetti

### **Responsive Breakpoints**

* **Mobile**: \< 768px with touch-optimized interactions and bottom sheet patterns  
* **Tablet**: 768px \- 1024px with hybrid mouse/touch patterns  
* **Desktop**: \> 1024px with full feature access and advanced keyboard shortcuts

### **Accessibility Features**

* **High contrast mode**: Alternative color scheme maintaining WCAG AA compliance  
* **Screen reader optimization**: Comprehensive ARIA labels and semantic markup  
* **Keyboard navigation**: Full tab order with visible focus indicators  
* **Motion preferences**: Reduced motion options for users with vestibular disorders

This design brief creates a cohesive, professional platform that bridges the gap between educational functionality and engaging user experience, positioning the platform as the definitive solution for modern music education.

# **Tech Specs**

## **File System Architecture**

\`\`\`  
Frontend/  
├── src/  
│   ├── components/  
│   │   ├── ui/                      \# Design system components  
│   │   ├── audio/                   \# IPPI-related components  
│   │   ├── education/               \# Student/teacher management  
│   │   └── repertoire/              \# Library management  
│   ├── pages/  
│   │   ├── dashboard/               \# Role-based dashboards  
│   │   ├── practice/                \# IPPI workspace  
│   │   └── admin/                   \# Account management  
│   ├── hooks/                       \# Custom React hooks  
│   ├── services/                    \# API clients  
│   ├── stores/                      \# State management  
│   └── utils/                       \# Shared utilities  
│  
Backend/  
├── api/  
│   ├── routes/  
│   │   ├── auth/                    \# Authentication endpoints  
│   │   ├── repertoire/              \# Audio processing & management  
│   │   ├── students/                \# Student management  
│   │   └── assignments/             \# Progress tracking  
│   ├── middleware/                  \# Auth, rate limiting, CORS  
│   ├── services/                    \# Business logic  
│   │   ├── audio-processing/        \# Stem separation pipeline  
│   │   ├── ai-integration/          \# Music.ai API  
│   │   └── permissions/             \# Role-based access control  
│   └── database/  
│       ├── migrations/              \# Schema versions  
│       ├── seeds/                   \# Initial data  
│       └── models/                  \# Data access layer  
│  
Infrastructure/  
├── storage/  
│   ├── s3-buckets/                  \# Audio files, attachments  
│   └── cdn-config/                  \# CloudFront distribution  
├── monitoring/  
│   ├── logs/                        \# Structured logging  
│   └── metrics/                     \# Performance monitoring  
└── deployment/  
    ├── environments/                \# Dev, staging, prod configs  
    └── ci-cd/                       \# Automated deployment  
\`\`\`  
---

## **Feature Specifications**

### **Feature 1: Interactive Practice & Playback Interface (IPPI)**

**Goal:** Core DAW-like interface enabling students and educators to interact with stemmed audio tracks with real-time tempo/key adjustment and educational overlays.

**API Relationships:**

* Music.ai Platform: Stem separation, chord detection, beat analysis, educational metadata, and other server-side audio processing  
* AWS S3/CloudFront: Audio file retrieval and caching  
* Web Audio API: Multi-stem audio routing, mixing, and real-time effects processing  
* SoundTouchJS Audio Worklet: High-quality tempo/pitch manipulation with off-main-thread processing

**Detailed Requirements:**

**Requirement A: Multi-Stem Audio Player**

* Support for 4+ simultaneous audio stems (vocals, drums, bass, other)  
* Individual volume/pan/mute/solo controls per stem  
* Real-time audio processing without quality degradation  
* Cross-browser compatibility (Chrome, Safari, Firefox, Edge)

**Requirement B: Real-Time Audio Manipulation**

* Tempo adjustment: 50%-200% of original speed without pitch change  
* Key adjustment: ±12 semitones with maintained audio quality  
* Loop functionality with beat-accurate boundaries  
* Scrubbing with immediate audio feedback (\<50ms latency)

**Requirement C: Educational Overlay System**

* Synchronized chord chart display with real-time detection  
* Lyrics display with word-level highlighting  
* Beat markers and section indicators  
* Sheet music PDF viewer with playback synchronization

**Requirement D: Timeline-Based Collaboration**

* Timestamped comment system anchored to audio timeline  
* Real-time comment synchronization across multiple users  
* Audio/video response capabilities within comment threads  
* Private vs. public comment visibility controls

**Implementation Guide:**

\`\`\`  
// Audio Processing Pipeline  
FUNCTION initializeAudioEngine():  
    audioContext \= new AudioContext()  
    stemNodes \= createStemAudioNodes(5) // vocals, drums, bass, guitar, other  
    effectsChain \= createEffectsChain() // tempo, pitch, EQ  
    mixerNode \= createMixerNode()  
      
    FOR each stem in stemNodes:  
        stem.connect(effectsChain).connect(mixerNode)  
      
    mixerNode.connect(audioContext.destination)  
      
    RETURN audioEngine {  
        context: audioContext,  
        stems: stemNodes,  
        effects: effectsChain,  
        mixer: mixerNode  
    }

// Real-time stem control  
FUNCTION updateStemControl(stemId, property, value):  
    IF property \== "volume":  
        stemNodes\[stemId\].gain.value \= value  
    ELSE IF property \== "mute":  
        stemNodes\[stemId\].gain.value \= value ? 0 : previousVolume  
    ELSE IF property \== "solo":  
        FOR each otherStem in stemNodes:  
            IF otherStem \!= stemId:  
                otherStem.gain.value \= value ? 0 : originalVolume

// Timeline comment system  
FUNCTION addTimelineComment(timestamp, content, isPrivate):  
    comment \= {  
        id: generateUUID(),  
        timestamp: timestamp,  
        content: content,  
        authorId: currentUser.id,  
        isPrivate: isPrivate,  
        createdAt: now(),  
        responses: \[\]  
    }  
      
    IF isOnline():  
        saveCommentToDatabase(comment)  
        broadcastCommentToRealtime(comment)  
    ELSE:  
        queueCommentForSync(comment)  
      
    renderCommentOnTimeline(comment)  
\`\`\`

**Data Flow Steps:**

1. Audio file uploaded → background Music.ai pipeline (stem separation & educational metadata analysis)  
2. Stems stored in S3 → CloudFront CDN distribution  
3. Client requests stems → Progressive loading with quality adaptation  
4. User interactions → Real-time audio processing via Web Audio API  
5. Comments/annotations → Supabase real-time synchronization

**Key Edge Cases:**

* Network disconnection during playback: Fallback to cached stems  
* Stem separation failure: Graceful degradation to original audio  
* Audio buffer underruns: Smart buffering with quality adaptation  
* Cross-device synchronization: Conflict resolution for simultaneous edits  
* Large file handling: Progressive loading with background processing

---

### **Feature 2: Educator Account & Student Management**

**Goal:** Comprehensive dashboard for educators to manage student rosters, track progress, and handle administrative tasks with FERPA-compliant permissions.

**API Relationships:**

* Clerk Organizations: Multi-tier authentication and role management
* Clerk Billing: Subscription management with feature gating
* SendGrid: Custom notification emails and announcements
* PostgreSQL: Educational progress data and analytics
* Clerk Compliance: SOC 2 Type 2 and audit trail infrastructure

**Detailed Requirements:**

**Requirement A: Three-Tier Permission System**

* Educator organizations: Full platform access with student management capabilities
* Student memberships: Organization-scoped access limited to assigned repertoire
* Parent accounts: View-only access with configurable permissions via custom roles
* Clerk invitations: Secure invitation system with built-in email delivery

**Requirement B: Student Roster Management**

* Student profiles: Photos, contact info, instrument details, skill level  
* Organization member management: Bulk operations via Clerk's admin APIs  
* Communication tools: Direct messaging, announcement broadcasts  
* Progress analytics: Visual dashboards with practice time tracking

**Requirement C: FERPA Compliance Architecture**

* Clerk's SOC 2 compliance with educational data protection
* Geographic data residency (US-East-1 for MVP)  
* Built-in audit trails for all organization member access
* Parent consent management for minors with custom metadata 
* Data retention policies with automated deletion

**Requirement D: Subscription Tier Management**

* Clerk Billing feature gating with has() helper for student count limits
* Built-in subscription UI with <PricingTable /> component
* Automatic billing integration with prorated upgrades/downgrades
* Usage analytics for tier optimization

**Implementation Guide:**

\`\`\`  
// Organization creation with Clerk
FUNCTION createEducatorOrganization(educator_email, subscription_tier):
    // Create user and organization in Clerk
    educator = await clerkClient.users.createUser({
        emailAddress: educator_email,
        publicMetadata: {
            role: "educator",
            subscription_tier: subscription_tier
        }
    })
    
    organization = await clerkClient.organizations.createOrganization({
        name: `${educator.firstName}'s Music Studio`,
        createdBy: educator.id,
        publicMetadata: {
            subscription_tier: subscription_tier,
            student_limit: getStudentLimit(subscription_tier),
            trial_ends_at: addDays(now(), 30)
        }
    })
    
    // Set up billing with Clerk Billing
    await clerkClient.allowlistIdentifiers.createAllowlistIdentifier({
        identifier: educator_email,
        notify: true
    })
    
    RETURN { educator, organization }

// Student invitation using Clerk's system
FUNCTION inviteStudent(organization_id, student_email, parent_email):
    invitation = await clerkClient.organizations.createOrganizationInvitation({
        organizationId: organization_id,
        emailAddress: student_email,
        role: "student",
        publicMetadata: {
            parent_email: parent_email,
            invitation_type: "student",
            expires_at: addDays(now(), 7)
        }
    })
    
    // Send custom notification to parent if minor
    if (parent_email) {
        sendParentNotification(parent_email, invitation)
    }
    
    RETURN invitation

// Permission enforcement using Clerk's has() helper
FUNCTION checkStudentAccess(user, repertoire_id):
    repertoire = getRepertoire(repertoire_id)
    
    // Check if user has access to the organization
    const hasOrgAccess = await user.has({
        permission: "org:read",
        organizationId: repertoire.organization_id
    })
    
    if (!hasOrgAccess) {
        RETURN false
    }
    
    // Check specific repertoire assignment
    if (repertoire.is_assigned_to_user(user.id)) {
        RETURN true
    }
    
    // Check if user's organization allows public access
    const allowsPublic = await user.has({
        permission: "repertoire:read_public"
    })
    
    if (repertoire.is_public && allowsPublic) {
        RETURN true
    }
    
    RETURN false

// Subscription validation using Clerk Billing
FUNCTION validateSubscriptionAccess(organization_id, feature):
    organization = await clerkClient.organizations.getOrganization({
        organizationId: organization_id
    })
    
    // Use Clerk's has() helper for feature gating
    const hasFeature = await organization.has({
        feature: feature
    })
    
    if (!hasFeature) {
        RETURN { 
            access: false, 
            reason: "subscription_upgrade_required",
            upgradeUrl: getClerkBillingUpgradeUrl(organization_id)
        }
    }
    
    // Check usage limits
    const currentUsage = getUsageStats(organization_id)
    const limits = await getSubscriptionLimits(organization.subscription_tier)
    
    SWITCH feature:
        CASE "add_student":
            if (currentUsage.member_count >= limits.max_students) {
                RETURN { 
                    access: false, 
                    reason: "student_limit_reached",
                    upgradeUrl: getClerkBillingUpgradeUrl(organization_id)
                }
            }
    
    RETURN { access: true }
\`\`\`

**Data Flow Steps:**

1. Educator signs up → Clerk organization creation → Clerk Billing activation → Trial period setup
2. Student invitation sent → Clerk's built-in email delivery → Organization invitation created
3. Student accepts → Clerk membership establishment → Role assignment → Parent notification
4. Parent notification → Optional parent user creation → Custom role assignment
5. All interactions → Clerk's audit infrastructure → FERPA compliance tracking

**Key Edge Cases:**

* Expired invitations: Clerk's automatic cleanup with re-send via organization management
* Student limit exceeded: Clerk Billing soft warnings with upgrade prompts
* Organization deletion: Clerk's cascade handling with member data preservation
* Cross-timezone scheduling: UTC normalization with local display
* Payment failures: Clerk Billing grace period with automatic feature limitations

---

### **Feature 3: Repertoire Management System**

**Goal:** Central library for organizing teaching materials with automatic stem separation, educational analysis, and flexible sharing controls.

**API Relationships:**

* AWS S3: Storage for audio files & other user-uploaded content with CloudFront CDN  
* Music.ai Platform: Automatic stem separation processing & educational metadata extraction  
* PostgreSQL: Metadata and relationship storage

**Detailed Requirements:**

**Requirement A: Multi-Source Audio Import**

* File upload: Direct drag-and-drop with progress indicators  
* URL import: Google Drive, Dropbox, iCloud, One Drive, Box, etc  
* Batch processing: Multiple files with queue management  
* Format support: MP3, WAV, FLAC, M4A up to 500MB per file

**Requirement B: Automatic Educational Analysis**

* Stem separation: Vocals, drums, bass, other instruments  
* Music theory analysis: Key detection, chord progressions, beat map, tempo  
* Structure analysis: Verse, chorus, bridge identification  
* Difficulty assessment: AI-generated skill level recommendations

**Requirement C: Flexible Content Organization**

* Metadata tagging: Instrument, genre, difficulty, duration  
* Search and filtering: Real-time text search with faceted filters  
* Collections: Custom playlists and curriculum organization  
* Version control: Track changes and maintain revision history

**Requirement D: Granular Sharing Controls**

* Privacy levels: Private, shared with students, public  
* Time-limited access: Expiring links for temporary sharing  
* Partial sharing: Audio visible, attachments private  
* Transfer permissions: Student repertoire portability between educators

**Implementation Guide:**

\`\`\`  
// Audio processing pipeline  
FUNCTION processAudioFile(file\_url, educator\_id):  
    processing\_job \= {  
        id: generateUUID(),  
        educator\_id: educator\_id,  
        source\_url: file\_url,  
        status: "queued",  
        created\_at: now()  
    }  
      
    saveProcessingJob(processing\_job)  
    queueBackgroundJob("process\_audio", processing\_job.id)  
      
    RETURN processing\_job

FUNCTION processAudioBackground(job\_id):  
    job \= getProcessingJob(job\_id)  
    updateJobStatus(job\_id, "processing")  
      
    TRY:  
        // Download and validate audio  
        audio\_data \= downloadAudio(job.source\_url)  
        validateAudioFormat(audio\_data)  
          
        // Store original in S3  
        original\_key \= uploadToS3(audio\_data, "originals/")  
         
        // Process through Music.ai workflow (stems \+ metadata in single job)  
        musicai\_job \= await musicAi.addJob({  
            name: \`process-${repertoire\_id}\`,  
            workflow: "music-education-complete", // Custom workflow combining stems \+ analysis  
            params: {  
                inputUrl: audio\_data\_url,  
                stemTypes: \["vocals", "drums", "bass", "other"\],  
                analysisModules: \["chords", "beats", "key", "sections"\]  
            }  
        });

        // Wait for processing completion  
        completed\_job \= await musicAi.waitForJobCompletion(musicai\_job.id);

        // Download and store results  
        stem\_keys \= \[\];  
        FOR each stem\_type in completed\_job.result.stems:  
            stem\_key \= uploadToS3(completed\_job.result.stems\[stem\_type\], "stems/");  
            stem\_keys.append(stem\_key);

        // Extract metadata from same job  
        metadata \= completed\_job.result.metadata; // Contains chords, beats, key, sections

        // Create repertoire record  
        repertoire \= {  
            id: generateUUID(),  
            educator\_id: job.educator\_id,  
            original\_s3\_key: original\_key,  
            stem\_s3\_keys: stem\_keys,  
            metadata: metadata,  
            status: "ready"  
        }  
          
        saveRepertoire(repertoire)  
        updateJobStatus(job\_id, "completed")  
        notifyEducator(job.educator\_id, "processing\_complete", repertoire.id)  
          
    CATCH error:  
        updateJobStatus(job\_id, "failed", error.message)  
        notifyEducator(job.educator\_id, "processing\_failed", error.message)

// Sharing permissions  
FUNCTION checkRepertoireAccess(user\_id, repertoire\_id):  
    repertoire \= getRepertoire(repertoire\_id)  
    user \= getUser(user\_id)  
      
    // Owner always has access  
    IF repertoire.educator\_id \== user\_id:  
        RETURN { access: true, level: "owner" }  
      
    // Check student access  
    IF user.role \== "student":  
        assignment \= getAssignment(user\_id, repertoire\_id)  
        IF assignment AND assignment.is\_active:  
            RETURN { access: true, level: "student" }  
      
    // Check public access  
    IF repertoire.is\_public:  
        RETURN { access: true, level: "public" }  
      
    RETURN { access: false }  
\`\`\`

**Data Flow Steps:**

1. Audio uploaded/imported → S3 storage → Processing queue entry  
2. Background job triggered → Music.ai stem separation & analysis  
3. Processed stems uploaded → CloudFront distribution → Database record creation  
4. Educator notification → Repertoire available in library → Student assignment possible  
5. Student access request → Permission check → Conditional stem delivery

**Key Edge Cases:**

* Large file uploads: Chunked upload with resume capability  
* API rate limiting: Queue management with retry logic  
* Processing failures: Graceful degradation with manual retry  
* Storage quota exceeded: Proactive warnings with cleanup suggestions  
* Copyright violations: Content scanning with takedown procedures

---

### **Feature 4: Assignment & Progress Tracking**

**Goal:** Tools for educators to create practice assignments and monitor student progress with detailed analytics and automated insights.

**API Relationships:**

* PostgreSQL: Assignment and progress data storage  
* Supabase Real-time: Live progress updates  
* Analytics API: Practice session analysis  
* Notification Service: Progress alerts and reminders  
* AI Analysis: Pattern recognition and recommendations

**Detailed Requirements:**

**Requirement A: Flexible Assignment Creation**

* Multi-repertoire assignments: Combine multiple pieces in single assignment  
* Targeted practice goals: Specific sections, tempo targets, skill objectives  
* Adaptive difficulty: AI-suggested modifications based on student level  
* Deadline management: Due dates with automatic reminders

**Requirement B: Comprehensive Progress Tracking**

* Practice time logging: Accurate session duration with break detection  
* Quality metrics: Timing accuracy, note precision, tempo consistency  
* Section mastery: Detailed progress on specific song sections  
* Streak tracking: Consecutive practice days with motivational feedback

**Requirement C: Real-Time Analytics Dashboard**

* Individual student views: Detailed progress timelines and skill development  
* Class overview: Heat maps showing engagement and completion rates  
* Predictive insights: AI-generated recommendations for intervention  
* Performance comparisons: Anonymous benchmarking against skill level peers

**Requirement D: Automated Intervention System**

* Early warning alerts: Students falling behind schedule detection  
* Adaptive content suggestions: Remedial exercises for struggling concepts  
* Celebration triggers: Achievement recognition and reward distribution  
* Parent communication: Automated progress reports and highlights

**Implementation Guide:**

\`\`\`  
// Assignment creation system  
FUNCTION createAssignment(educator\_id, assignment\_data):  
    assignment \= {  
        id: generateUUID(),  
        educator\_id: educator\_id,  
        title: assignment\_data.title,  
        repertoire\_ids: assignment\_data.repertoire\_ids,  
        target\_sections: assignment\_data.target\_sections,  
        practice\_goals: assignment\_data.practice\_goals,  
        due\_date: assignment\_data.due\_date,  
        student\_ids: assignment\_data.student\_ids,  
        created\_at: now()  
    }  
      
    saveAssignment(assignment)  
      
    FOR each student\_id in assignment.student\_ids:  
        createStudentAssignment(student\_id, assignment.id)  
        sendAssignmentNotification(student\_id, assignment)  
      
    RETURN assignment

// Practice session tracking  
FUNCTION startPracticeSession(student\_id, repertoire\_id, assignment\_id):  
    session \= {  
        id: generateUUID(),  
        student\_id: student\_id,  
        repertoire\_id: repertoire\_id,  
        assignment\_id: assignment\_id,  
        start\_time: now(),  
        sections\_practiced: \[\],  
        quality\_metrics: {},  
        status: "active"  
    }  
      
    savePracticeSession(session)  
    updateStudentStatus(student\_id, "practicing", repertoire\_id)  
      
    RETURN session

FUNCTION recordPracticeActivity(session\_id, activity\_data):  
    session \= getPracticeSession(session\_id)  
      
    // Track section focus  
    IF activity\_data.section\_played:  
        addSectionPractice(session\_id, activity\_data.section\_played)  
      
    // Analyze performance quality  
    IF activity\_data.timing\_data:  
        analyzeTimingAccuracy(session\_id, activity\_data.timing\_data)  
      
    // Update real-time metrics  
    updateSessionMetrics(session\_id, activity\_data)  
    broadcastProgressUpdate(session.student\_id, session.assignment\_id)

FUNCTION endPracticeSession(session\_id):  
    session \= getPracticeSession(session\_id)  
    session.end\_time \= now()  
    session.total\_duration \= session.end\_time \- session.start\_time  
    session.status \= "completed"  
      
    // Generate session summary  
    session.summary \= generateSessionSummary(session)  
      
    // Update assignment progress  
    updateAssignmentProgress(session.assignment\_id, session.student\_id)  
      
    // Check for achievements  
    checkAndAwardAchievements(session.student\_id, session)  
      
    // Trigger educator notifications if needed  
    IF shouldNotifyEducator(session):  
        notifyEducator(session.assignment\_id, session.summary)  
      
    savePracticeSession(session)  
    updateStudentStatus(session.student\_id, "offline")

// Analytics and insights  
FUNCTION generateProgressInsights(student\_id, timeframe):  
    sessions \= getPracticeSessions(student\_id, timeframe)  
    assignments \= getAssignments(student\_id, timeframe)  
      
    insights \= {  
        total\_practice\_time: calculateTotalTime(sessions),  
        consistency\_score: calculateConsistency(sessions),  
        improvement\_rate: calculateImprovement(sessions),  
        challenge\_areas: identifyStrugglingAreas(sessions),  
        strengths: identifyStrengths(sessions),  
        recommendations: generateRecommendations(sessions, assignments)  
    }  
      
    RETURN insights  
\`\`\`

**Data Flow Steps:**

1. Assignment created → Student notifications sent → Calendar entries generated  
2. Student starts practice → Session tracking initiated → Real-time updates begin  
3. Practice activities recorded → Quality metrics calculated → Progress updated  
4. Session completed → Summary generated → Achievement checks triggered  
5. Analytics processed → Insights generated → Educator dashboard updated

**Key Edge Cases:**

* Interrupted practice sessions: Auto-save with session recovery  
* Multiple device practice: Session continuity across platforms  
* Data privacy: Student data isolation with parent access controls  
* Performance optimization: Efficient analytics calculation for large datasets

---

### **Feature 5: User Authentication & Permission System**

**Goal:** Secure, FERPA-compliant multi-tier authentication supporting educators, students, and parents with granular permission controls.

**API Relationships:**

* Clerk Authentication: Core auth infrastructure with B2B organization support
* Clerk Organizations: Role-based access control and member management
* Clerk Billing: Subscription verification and feature gating
* PostgreSQL: Educational data with Clerk user relationships
* Clerk Compliance: SOC 2 Type 2 audit trails and session management

**Detailed Requirements:**

**Requirement A: Multi-Role Authentication**

* Educator accounts: Organization owners with full platform access via Clerk Organizations
* Student accounts: Organization members with role-based repertoire access
* Parent accounts: Custom roles with view-only permissions and configurable controls
* Admin accounts: Platform administration with elevated organization privileges

**Requirement B: FERPA Compliance Framework**

* Clerk's SOC 2 Type 2 compliance for educational record protection
* Built-in audit trail logging: All organization member data access tracked
* Custom metadata management: Digital consent forms for minors in user profiles
* Automated session management: Secure token handling with Clerk's infrastructure

**Requirement C: Subscription Integration**

* Clerk Billing feature access: Real-time subscription validation with has() helper
* Organization member limits: Built-in enforcement with upgrade prompts
* Integrated billing UI: <PricingTable /> and <UserProfile /> components
* Trial management: Feature limitations via Clerk Billing configuration

**Requirement D: Security Hardening**

* Multi-factor authentication: Clerk's built-in MFA with organization policies
* Advanced session management: Clerk's secure token handling with device monitoring
* Built-in rate limiting: Tiered limits based on organization subscription
* SOC 2 compliance: End-to-end encryption for sensitive educational records

**Implementation Guide:**

\`\`\`  
// Organization-based account creation
FUNCTION createEducatorAccount(email, subscription_tier):
    // Create educator user in Clerk
    educator = await clerkClient.users.createUser({
        emailAddress: email,
        publicMetadata: {
            role: "educator",
            subscription_tier: subscription_tier,
            created_at: now()
        }
    })
    
    // Create organization for the educator
    organization = await clerkClient.organizations.createOrganization({
        name: `${educator.firstName}'s Studio`,
        createdBy: educator.id,
        publicMetadata: {
            subscription_tier: subscription_tier,
            trial_ends_at: addDays(now(), 30)
        }
    })
    
    // Set up Clerk Billing subscription
    await setupClerkBilling(organization.id, subscription_tier)
    
    RETURN { educator, organization }

// Student account creation via invitation
FUNCTION acceptStudentInvitation(invitation_id, student_details):
    invitation = await clerkClient.organizations.getOrganizationInvitation({
        invitationId: invitation_id
    })
    
    // Create student user
    student = await clerkClient.users.createUser({
        emailAddress: invitation.emailAddress,
        publicMetadata: {
            role: "student",
            educator_organization_id: invitation.organizationId,
            instrument: student_details.instrument,
            skill_level: student_details.skill_level
        }
    })
    
    // Accept organization invitation
    await clerkClient.organizations.acceptInvitation({
        invitationId: invitation_id,
        userId: student.id
    })
    
    // Set up parent linking if needed
    if (student_details.parent_email) {
        await createParentLink(student.id, student_details.parent_email)
    }
    
    RETURN student

// Advanced permission checking with Clerk
FUNCTION checkResourcePermission(user, resource_type, resource_id, action):
    // Check organization membership first
    const userOrgs = await clerkClient.users.getOrganizationMembershipList({
        userId: user.id
    })
    
    SWITCH resource_type:
        CASE "repertoire":
            repertoire = getRepertoire(resource_id)
            
            // Check if user belongs to repertoire's organization
            const orgMembership = userOrgs.find(
                org => org.organization.id === repertoire.organization_id
            )
            
            if (!orgMembership) RETURN false
            
            // Use Clerk's role system for permission checking
            const hasPermission = await user.has({
                permission: `repertoire:${action}`,
                organizationId: repertoire.organization_id
            })
            
            // Additional checks for student assignments
            if (user.publicMetadata.role === "student") {
                const assignment = getStudentAssignment(user.id, resource_id)
                RETURN hasPermission && assignment && assignment.is_active
            }
            
            RETURN hasPermission

// Subscription-based feature gating
FUNCTION validateFeatureAccess(organization_id, feature):
    organization = await clerkClient.organizations.getOrganization({
        organizationId: organization_id
    })
    
    // Use Clerk Billing's has() helper
    const hasFeature = await organization.has({
        feature: feature
    })
    
    if (!hasFeature) {
        RETURN {
            access: false,
            reason: "subscription_upgrade_required",
            upgradeUrl: `/billing/upgrade?org=${organization_id}`
        }
    }
    
    // Check usage limits for the feature
    const usage = getOrganizationUsage(organization_id)
    const limits = getSubscriptionLimits(organization.publicMetadata.subscription_tier)
    
    SWITCH feature:
        CASE "student_management":
            if (usage.member_count >= limits.max_students) {
                RETURN {
                    access: false,
                    reason: "member_limit_reached",
                    current: usage.member_count,
                    limit: limits.max_students
                }
            }
        CASE "advanced_analytics":
            if (!limits.includes_analytics) {
                RETURN {
                    access: false,
                    reason: "feature_not_included",
                    upgradeUrl: `/billing/upgrade?org=${organization_id}`
                }
            }
    
    RETURN { access: true }

// Enhanced audit logging with Clerk integration
FUNCTION logEducationalDataAccess(user_id, action, resource_type, resource_id):
    user = await clerkClient.users.getUser({ userId: user_id })
    
    // Leverage Clerk's built-in session information
    const sessions = await clerkClient.sessions.getSessionList({
        userId: user_id,
        status: 'active'
    })
    
    audit_entry = {
        id: generateUUID(),
        user_id: user_id,
        user_email: user.emailAddresses[0].emailAddress,
        organization_id: user.publicMetadata.organization_id,
        action: action,
        resource_type: resource_type,
        resource_id: resource_id,
        session_id: sessions[0]?.id,
        timestamp: now(),
        compliance_flags: {
            ferpa_applicable: true,
            coppa_applicable: checkCOPPAStatus(user_id)
        }
    }
    
    saveAuditLog(audit_entry)
    
    // Alert on sensitive educational data access
    if (action.includes("student_data") || action.includes("grade")) {
        alertComplianceTeam(audit_entry)
    }
\`\`\`

**Data Flow Steps:**

1. User registration → Clerk user creation → Organization assignment → Role-based setup
2. Login attempt → Clerk authentication → Session establishment → Feature access validation
3. Resource access → Organization membership check → Clerk permission validation → Audit logging
4. Subscription changes → Clerk Billing webhook → Feature access recalculation → Real-time updates
5. Educational data access → Clerk session tracking → FERPA compliance logging → Retention enforcement

**Key Edge Cases:**

* Subscription downgrades: Clerk Billing graceful degradation with data preservation
* Organization transfers: Clerk's built-in member management with role preservation
* Parent consent revocation: Automated student account limitations with educator notification
* Clerk session expiry: Automatic re-authentication with educational context preservation
* Cross-organization access: Clerk's multi-organization support with permission inheritance

# **Addendum \- Technical Architecture Evolution**

## **Note to the Developer**

This addendum outlines new technologies that have been added to our stack since drafting the prior sections of this PRD. Generally I think it will be pretty clear to you how these choices fit with the rest of the stack. If you encounter conflicting information between this addendum and the previous sections of the PRD, lean in favor of the addendum. Feel free to clarify any ambiguities with me.

## **Core Infrastructure**

### **State Management**

**Zustand** — *Lightweight client-side state management*

* **Audio-centric stores**: Separate stores for audio controls (tempo, pitch, stem visibility), processing jobs, and user session data  
* **Selective subscriptions**: Only components that need specific data re-render, crucial for real-time audio performance  
* **Minimal boilerplate**: Straightforward API that matches your focused MVP approach  
* **React-first integration**: Seamless hooks-based usage without complex setup

*Strategic benefits: Faster development velocity, better performance for real-time audio manipulation, easier team onboarding*

---

### **API Layer**

**tRPC Integration** — *End-to-end type safety*

* **Type-safe Clerk procedures**: Strongly-typed organization management, user authentication, and billing operations
* **Type-safe Music.ai integration**: Strongly-typed procedures for stem separation jobs and educational metadata  
* **Real-time collaboration**: Built-in subscription support for collaborative commenting features with Clerk user context 
* **Educational data management**: Complex student progress and lesson data with guaranteed type safety and Clerk organization relationships
* **React Query integration**: Automatic caching and synchronization for audio metadata and Clerk user data

*Strategic benefits: Eliminates API integration bugs, improves developer experience,seamless Clerk B2B integration, reduces refactoring time as the app scales*

---

## **Authentication & User Management**

### **Multi-Tier Auth System**

**Clerk Organizations** — *B2B SaaS authentication with educational compliance*

* **Organization-based architecture**: Educator organizations with student memberships and parent roles
* **Built-in billing integration**: Clerk Billing with subscription tiers and feature gating via has() helper
* **FERPA compliance**: SOC 2 Type 2 compliance with built-in audit trails and session management
* **Advanced role system**: Custom permissions for educators, students, and parents with organization-scoped access
* **Invitation system**: Built-in email delivery and secure onboarding workflows

*Strategic benefits: Enterprise-ready compliance, reduced auth development time, seamless billing integration*

---

## **Audio Processing Pipeline**

### **Client-Side Audio**

**SoundTouchJS \+ Web Audio API** — *Professional-grade real-time processing*

* **SoundTouchJS Audio Worklet**: High-quality tempo/pitch processing running in isolated audio threads  
* **Web Audio API**: Multi-stem routing, volume/pan/solo/mute controls, and effects chain management  
* **Real-time performance**: Zero-latency adjustments for educational interactions  
* **Professional quality**: Maintains audio fidelity during manipulation, crucial for music education

*Strategic benefits: Eliminates server-side processing costs, provides instant feedback for students, enables unlimited experimentation*

---

### **AI Processing**

**Music.ai Platform Consolidation** — *Unified audio analysis workflow*

* **Single workflow approach**: Combined stem separation \+ chord detection \+ beat mapping \+ lyric transcription in one job  
* **Reduced latency**: Eliminated multiple API calls and file transfers between services  
* **More granular options**: Access to 18+ individual stems vs basic 4-stem separation  
* **Simplified architecture**: One API integration instead of managing multiple audio processing services

*Strategic benefits: Faster time-to-market for MVP, reduced API complexity and costs, better educational metadata extraction*

---

## **Background Processing**

### **Job Management**

**Trigger.dev** — *Reliable background job processing*

* **Music.ai workflow management**: Handles stem separation, chord detection, and beat analysis jobs that can take several minutes  
* **Event-driven architecture**: Triggers based on user uploads, processing completion, and educational milestones with Clerk organization context
* **Clerk integration**: Seamless user and organization context in background jobs for compliance and analytics
* **Supabase integration**: Database updates when processing completes with proper Clerk user relationships

*Strategic benefits: Eliminates infrastructure management, provides reliable processing with full user context, scales automatically*

---

## **Data & Storage**

### **Database Layer**

**Drizzle ORM** — *High-performance TypeScript ORM with Clerk integration*

* **Type-safe database queries**: Full TypeScript integration with complex music metadata relationships and Clerk user data  
* **Performance optimization**: Better query performance for real-time educational analytics  
* **tRPC compatibility**: Native integration with type-safe API procedures and Clerk procedures
* **Clerk relationships**: Efficient handling of organization memberships, user roles, and subscription data
* **Migration management**: Robust schema versioning that works well with Supabase and Clerk webhooks

*Strategic benefits: Improved developer experience with type safety, seamless Clerk data relationships, better performance for complex educational queries*

---

### **File Storage**

**AWS S3 \+ CloudFront** — *Optimized audio delivery*

* **iOS compatibility**: Reliable audio streaming on Safari with proper byte-range request support  
* **Performance optimization**: CloudFront CDN for global delivery and progressive loading  
* **Hybrid approach**: S3 for large audio files, Supabase Storage for small assets and real-time collaboration files  
* **Music.ai integration**: Direct S3 output reduces transfer steps in processing pipeline

*Strategic benefits: Ensures reliable audio playback across all devices, provides better global performance*

---

## **Analytics & Insights**

### **Product Intelligence**

**PostHog Analytics** — *FERPA-compliant educational analytics*

* **Educational-specific tracking**: Stem usage patterns, practice session quality, tempo adjustment behaviors, and collaboration feature adoption  
* **Clerk user analytics**: Organization-based usage tracking, subscription tier behavior, and user role analytics
* **FERPA compliance**: Privacy-first approach with proper data residency and consent management  
* **Product-market fit insights**: Understanding which features drive learning value and engagement  
* **Technical performance**: SoundTouchJS performance monitoring and Web Audio API compatibility tracking

*Strategic benefits: Enables data-driven product development with complete user context, organization-level insights, provides early warning for technical issues*

---

## **UI/UX Enhancement (Post-MVP)**

### **Interactive Animations**

**Framer Motion** — *Advanced animations for educational engagement*

* **Audio-reactive visualizations**: Animations that respond to tempo changes, beat patterns, and stem isolation
* **Educational progress animations**: Confetti celebrations, achievement unlocks, and practice milestone indicators
* **Gesture-based interactions**: Drag-and-drop stem controls, swipe gestures for mobile practice sessions
* **Layout transitions**: Smooth transitions between practice modes, lesson views, and collaborative spaces
* **Mobile optimization**: Touch-friendly interactions optimized for tablet-based music education


*Strategic benefits: Enhanced student engagement, improved mobile experience, professional polish for institutional adoption*

**Implementation Timeline**: Add after core audio functionality is stable to avoid performance conflicts with real-time audio processing.

---

## **System Integration Flow**

User Interaction → Clerk Auth → Zustand State → tRPC Procedures → Trigger.dev Jobs → Music.ai Processing → AWS S3 Storage → Web Audio API → Real-time Updates → PostHog Analytics

**Key Connections:**

* **Clerk ↔ tRPC**: Organization-based auth procedures and billing management
* **Clerk ↔ Trigger.dev**: User and organization context in background jobs
* **Zustand ↔ tRPC**: Server state vs client state separation
* **tRPC ↔ Trigger.dev**: Background job management with type safety
* **Music.ai ↔ AWS S3**: Direct processing output storage
* **Web Audio API ↔ SoundTouchJS**: Real-time audio manipulation
* **All components ↔ PostHog**: Comprehensive usage insights
* **Framer Motion ↔ Zustand**: Animation state synchronized with audio and user interactions *(Post-MVP)*