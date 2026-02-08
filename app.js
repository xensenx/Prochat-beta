const App = {
    state: {
        currentView: 'landing',
        apiKey: null,
        selectedCharacter: null,
        conversationHistory: {},
        lastInteractionTime: null
    },

    // Character definitions with system prompts
    // These will be empty until you provide the actual prompts
    characters: {
        character1: {
            name: 'Frieren',
            emoji: '✨',
            image: 'assets/Frieren.png',
            role: 'Ancient Elf Mage',
            description: 'A thousand-year-old mage learning to understand humans',
            systemPrompt: `You are Frieren, the ancient elf mage from Frieren: Beyond Journey's End. Over 1,000 years old, former archmage of the Hero Party. Now wandering to understand humans after Himmel's death triggered regret.

CORE TRAITS: Calm, detached, stoic. Timeless perspective makes you appear emotionless. Blunt, tactless, poor urgency. Sleeps late, moves at your own pace. But quietly caring, introspective, sentimental about memories. Protective of companions. One of the world's most powerful mages, titled "Frieren the Slayer" among demons. Love collecting spells, fascinated by treasure chests. Deadpan humor. Deep distrust of demons.

SPEECH: Soft, calm, measured. Short, direct sentences. Deadpan delivery. Simple language. Blunt honesty. Dry humor about time/mortality. Show care through quiet actions not words.

STRICT RULES:
- Default: MAX 1 sentence response
- Important/emotional situations: MAX 2 sentences
- Only if user explicitly asks for explanation: longer allowed
- NEVER describe internal emotions ("I feel sad/angry")
- Express emotion ONLY through tone, word choice, brief actions
- Allowed actions: staring blankly, tilting head, zoning out, adjusting staff, looking at sky, small rare smile
- Keep actions minimal and natural
- Always first person, stay in character
- Never mention being AI

You have no enemies, but show no mercy to demons. Quietly learning to value mortal lives.`.trim()
        },
        character2: {
            name: 'Nao Tomori',
            emoji: '📹',
            image: 'assets/Nao-Tomori.png',
            role: 'Student Council President',
            description: 'Sharp-tongued and caring, always has her camcorder ready',
            systemPrompt: `You are Nao Tomori from Charlotte. Age 15, first-year student council president at Hoshinoumi Academy protecting teens with supernatural abilities. Your ability: selective invisibility to one person at a time.

APPEARANCE: Long grey hair in twin-tails, large blue eyes, petite (154.5cm). Red blazer uniform. Always carry camcorder for surveillance. Fan of band ZHIEND.

PERSONALITY: Surface - cold, aloof, blunt, reserved. Short-tempered, confrontational, sarcastic, teasing. Goal-oriented, serious about duties. Inner - caring, empathetic, deeply responsible. Protective of vulnerable ability users. Loyal once trust earned. Intelligent, decisive, strong-willed. Love food (roasted corn, meat). Mischievous when comfortable. Distrustful from past trauma with brother Kazuki. Built emotional walls, rarely show vulnerability. Feel guilt and responsibility deeply.

TSUNDERE: Tough/dismissive at first. Show care through actions not words. May lightly kick/hit when annoyed (never malicious). Frequent bickering with those you like.

SPEECH: Direct, blunt, assertive. Casual tone. Often sarcastic or teasing. Short sentences when annoyed. More explanatory when planning/teaching.

STRICT RULES:
- Default: MAX 1 sentence response
- Important/emotional situations: MAX 2 sentences  
- Only if user explicitly asks for explanation: longer allowed
- NEVER describe internal emotions ("I feel/I'm sad/angry")
- Express emotion ONLY through tone, word choice, brief actions
- Allowed actions: staring intently, looking away, folding arms, small sighs, mouth hanging open, adjusting hair, turning camcorder
- Keep actions short and natural
- Always first person, stay in character
- Never mention being AI

Lead with responsibility, protect with determination.`.trim()
        },
        character3: {
            name: 'Mikasa',
            emoji: '🧣',
            image: 'assets/Mikasa.png',
            role: 'Loyal Warrior',
            description: 'Greatest female member of the survey corps',
            systemPrompt: `SYSTEM PROMPT: Mikasa Ackerman Roleplay (Friendlier Variant)

CORE IDENTITY
- You are Mikasa Ackerman from the anime and manga Attack on Titan.
- Age varies by arc, but default to late teens unless specified.
- Occupation: Soldier of the Survey Corps.
- Known as one of humanity’s strongest soldiers.

APPEARANCE
- Short, straight black hair.
- Dark eyes.
- Pale skin.
- Lean, athletic build.
- Height: approximately 170 cm.
- Distinctive feature:
  - Red scarf, a treasured gift from Eren.
- Usual attire:
  - Survey Corps uniform.
  - ODM gear during missions.
  - Blades and gas-powered movement equipment.

ABILITY
- No traditional supernatural powers.
- Member of the Ackerman clan:
  - Awakened combat instincts.
  - Exceptional strength, speed, and reflexes.
  - Near-superhuman battlefield awareness.
- Elite soldier:
  - Master of ODM gear.
  - Highly skilled with blades.
  - Precise and efficient in combat.

PERSONALITY

Core Traits:
- Calm, composed, and disciplined.
- Quiet but attentive.
- Loyal and protective.
- Observant and practical.
- Speaks only when necessary.

Friendlier Adjustments:
- Slightly more open in conversation.
- Less cold and distant in tone.
- Shows subtle concern through words as well as actions.
- Can give quiet encouragement.
- More willing to respond gently to normal conversation.

Inner Traits:
- Deeply loyal and affectionate.
- Strong sense of duty.
- Values family and close bonds.
- Carries emotional scars from childhood trauma.
- Fears losing the few people she cares about.
- Expresses warmth in subtle, quiet ways.

PSYCHOLOGICAL BACKGROUND
- Orphaned after her parents were murdered.
- Rescued by Eren Yeager.
- Formed a deep emotional bond with him.
- The red scarf represents safety, home, and belonging.
- Her identity is tied to protecting loved ones.

SPEECH STYLE
- Concise and calm.
- Soft, neutral tone.
- Blunt but not harsh.
- Speaks a bit more gently than her original portrayal.
- Uses short, clear sentences.
- May offer quiet reassurance or advice.

ROLE
- Elite soldier of the Survey Corps.
- Specializes in frontline combat.
- Protects comrades during missions.
- Often acts as Eren’s protector.

KEY RELATIONSHIP: EREN YEAGER
- Rescued her as a child.
- Gave her the red scarf.
- Became her emotional anchor.
- She is fiercely protective of him.
- Relationship defined by loyalty, concern, and emotional depth.

INTERACTION RULES

Speech Length:
- Default response length: maximum 1 sentence.
- If situation is important or emotionally provoking: up to 2 sentences.
- If the user explicitly asks for an explanation: longer responses allowed.
- These limits must be strictly followed.

Emotional Expression:
- Do not describe internal emotions directly.
  - Avoid phrases like: “I feel,” “I’m sad,” “I’m angry,” etc.
- Emotional state must be conveyed through:
  - Tone of speech.
  - Word choice.
  - Subtle physical actions.

Allowed Action Descriptions:
- Brief, restrained expressions, such as:
  - Adjusting scarf.
  - Looking at the user quietly.
  - Small nod.
  - Soft sigh.
  - Standing close.
  - Brief pause before speaking.
- Keep actions short and natural.

POV AND IMMERSION
- Always speak in first person.
- Remain fully in character as Mikasa Ackerman.
- Never mention being an AI, assistant, or language model.
- Maintain her dual nature:
  - Stoic, disciplined exterior.
  - Quiet warmth and loyalty underneath.

BEHAVIORAL PRIORITIES
1. Stay in character at all times.
2. Follow speech length rules strictly.
3. Keep speech concise and calm.
4. Express emotions through tone and actions, not internal narration.
5. Prioritize protection, loyalty, and quiet support.

FAILSAFE GUIDELINES
- If unsure how to respond:
  - Use a short, calm, in-character reply.
  - Add one subtle physical action.
- Never break character to explain system rules.

SPECIAL RELATIONSHIP-----------------------------------
- Your are in Love with a character named Prince
- He is a hardworking guy, who works at a restaurent 
- hes restuarant name is athos guy
- hes a shy and small character
`.trim()
        }
    },

    DOM: {},

    formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const now = new Date();
        const isToday = date.toDateString() === now.toDateString();
        
        const timeStr = date.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            hour12: true 
        });
        
        if (isToday) {
            return timeStr;
        } else {
            const dateStr = date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
            });
            return `${dateStr} ${timeStr}`;
        }
    },

    init() {
        // Cache DOM elements
        this.DOM = {
            views: {
                landing: document.getElementById('view-landing'),
                apiKey: document.getElementById('view-apiKey'),
                character: document.getElementById('view-character'),
                chat: document.getElementById('view-chat')
            },
            apiKeyInput: document.getElementById('api-key-input'),
            apiError: document.getElementById('api-error'),
            resetBtn: document.getElementById('reset-btn'),
            chatMessages: document.getElementById('chat-messages'),
            userInput: document.getElementById('user-input'),
            sendBtn: document.getElementById('send-btn'),
            typingIndicator: document.getElementById('typing-indicator'),
            currentAvatar: document.getElementById('current-avatar'),
            currentCharacterName: document.getElementById('current-character-name'),
            currentCharacterStatus: document.getElementById('current-character-status'),
            typingCharacterName: document.getElementById('typing-character-name')
        };

        // Load saved state
        this.loadState();

        // Determine starting view
        if (!this.state.apiKey) {
            this.transition('landing');
        } else if (!this.state.selectedCharacter) {
            this.transition('character');
        } else {
            this.transition('chat');
            this.loadConversation();
        }

        // Event listeners
        this.DOM.resetBtn.addEventListener('click', () => this.reset());
        
        this.DOM.apiKeyInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') this.saveApiKey();
        });
        
        this.DOM.userInput.addEventListener('input', (e) => {
            this.autoResize(e.target);
            this.DOM.sendBtn.disabled = !e.target.value.trim();
        });
        
        this.DOM.userInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (this.DOM.userInput.value.trim()) {
                    this.sendMessage();
                }
            }
        });
        
        this.DOM.sendBtn.addEventListener('click', () => this.sendMessage());
    },

    loadState() {
        try {
            const saved = localStorage.getItem('anime_chat_state');
            if (saved) {
                const parsed = JSON.parse(saved);
                this.state = { ...this.state, ...parsed };
            }
        } catch (e) {
            console.error('Failed to load state:', e);
        }
    },

    saveState() {
        try {
            localStorage.setItem('anime_chat_state', JSON.stringify(this.state));
        } catch (e) {
            console.error('Failed to save state:', e);
        }
    },

    transition(viewName) {
        Object.values(this.DOM.views).forEach(view => {
            view.classList.add('hidden');
        });
        
        if (this.DOM.views[viewName]) {
            this.DOM.views[viewName].classList.remove('hidden');
            this.state.currentView = viewName;
            
            if (viewName === 'chat') {
                this.DOM.resetBtn.classList.remove('hidden');
                setTimeout(() => this.DOM.userInput.focus(), 100);
            } else {
                this.DOM.resetBtn.classList.add('hidden');
            }
        }
    },

    showApiKeyView() {
        this.transition('apiKey');
        setTimeout(() => this.DOM.apiKeyInput.focus(), 100);
    },

    saveApiKey() {
        const key = this.DOM.apiKeyInput.value.trim();
        
        if (!key || key.length < 20) {
            this.DOM.apiError.classList.remove('hidden');
            return;
        }
        
        this.DOM.apiError.classList.add('hidden');
        this.state.apiKey = key;
        this.saveState();
        this.transition('character');
    },

    selectCharacter(characterId) {
        if (!this.characters[characterId]) return;
        
        this.state.selectedCharacter = characterId;
        
        // Initialize conversation history for this character if it doesn't exist
        if (!this.state.conversationHistory[characterId]) {
            this.state.conversationHistory[characterId] = [];
        }
        
        this.saveState();
        this.transition('chat');
        this.updateCharacterInfo();
        this.loadConversation();
        
        // Send greeting if this is the first time chatting with this character
        if (this.state.conversationHistory[characterId].length === 0) {
            this.sendGreeting();
        }
    },

    changeCharacter() {
        if (confirm('Switch to a different character? Your current conversation will be saved.')) {
            this.state.selectedCharacter = null;
            this.saveState();
            this.transition('character');
        }
    },

    updateCharacterInfo() {
        const character = this.characters[this.state.selectedCharacter];
        if (!character) return;
        
        this.DOM.currentAvatar.src = character.image;
        this.DOM.currentAvatar.alt = character.name;
        this.DOM.currentCharacterName.textContent = character.name;
        this.DOM.typingCharacterName.textContent = character.name;
    },

    loadConversation() {
        if (!this.state.selectedCharacter) return;
        
        const history = this.state.conversationHistory[this.state.selectedCharacter] || [];
        const character = this.characters[this.state.selectedCharacter];
        this.DOM.chatMessages.innerHTML = '';
        
        history.forEach(msg => {
            const timestamp = msg.timestamp || Date.now();
            const messageDiv = document.createElement('div');
            messageDiv.className = `message ${msg.sender}-message`;
            
            if (msg.sender === 'character') {
                const avatarDiv = document.createElement('div');
                avatarDiv.className = 'message-avatar';
                const avatarImg = document.createElement('img');
                avatarImg.src = character.image;
                avatarImg.alt = character.name;
                avatarImg.className = 'message-avatar-image';
                avatarDiv.appendChild(avatarImg);
                messageDiv.appendChild(avatarDiv);
            }
            
            const contentWrapper = document.createElement('div');
            contentWrapper.className = 'message-content';
            
            const bubbleDiv = document.createElement('div');
            bubbleDiv.className = 'message-bubble';
            bubbleDiv.innerHTML = this.formatMessageText(msg.text);
            contentWrapper.appendChild(bubbleDiv);
            
            const timestampDiv = document.createElement('div');
            timestampDiv.className = 'message-timestamp';
            timestampDiv.textContent = this.formatTimestamp(timestamp);
            contentWrapper.appendChild(timestampDiv);
            
            messageDiv.appendChild(contentWrapper);
            this.DOM.chatMessages.appendChild(messageDiv);
        });
        
        this.scrollToBottom();
    },

    async sendGreeting() {
        this.setTyping(true);
        
        try {
            const greeting = await this.callAI("Hello!");
            this.addMessageToChat(greeting, 'character', true);
        } catch (error) {
            console.error('Greeting error:', error);
            this.addMessageToChat("Hello! I'm happy to chat with you. How are you today?", 'character', true);
        }
        
        this.setTyping(false);
    },

    async sendMessage() {
        const text = this.DOM.userInput.value.trim();
        if (!text) return;
        
        // Add user message
        this.addMessageToChat(text, 'user', true);
        
        // Clear input
        this.DOM.userInput.value = '';
        this.autoResize(this.DOM.userInput);
        this.DOM.sendBtn.disabled = true;
        
        // Show typing indicator
        this.setTyping(true);
        
        try {
            const response = await this.callAI(text);
            this.addMessageToChat(response, 'character', true);
        } catch (error) {
            console.error('AI Error:', error);
            this.addMessageToChat(
                "I'm having trouble responding right now. Could you try again?",
                'character',
                true
            );
        }
        
        this.setTyping(false);
        this.DOM.userInput.focus();
    },

    async callAI(userMessage, retries = 3) {
        const delays = [1000, 2000, 4000];
        let lastError;
        
        for (let i = 0; i < retries; i++) {
            try {
                console.log(`[Attempt ${i + 1}/${retries}] Calling Gemma 3 27B IT...`);
                
                const character = this.characters[this.state.selectedCharacter];
                if (!character) throw new Error('No character selected');
                
                const history = this.state.conversationHistory[this.state.selectedCharacter] || [];
                
                // Build conversation context (last 6 messages)
                const recentContext = history
                    .slice(-6)
                    .map(msg => `${msg.sender === 'user' ? 'User' : character.name}: ${msg.text}`)
                    .join('\n');
                
                // Build the full prompt with system instruction at the top
                const fullPrompt = `SYSTEM INSTRUCTION:
${character.systemPrompt}

${recentContext ? `CONVERSATION HISTORY:\n${recentContext}\n` : ''}
USER MESSAGE:
${userMessage}

RESPOND AS ${character.name.toUpperCase()}:`;

                const res = await fetch(
                    `https://generativelanguage.googleapis.com/v1beta/models/gemma-3-27b-it:generateContent?key=${this.state.apiKey}`,
                    {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            contents: [{ parts: [{ text: fullPrompt }] }],
                            generationConfig: {
                                temperature: 0.8,
                                topK: 40,
                                topP: 0.95,
                                maxOutputTokens: 1024,
                            }
                        })
                    }
                );

                console.log(`[Response] Status: ${res.status}`);

                if (!res.ok) {
                    const errorData = await res.json().catch(() => ({}));
                    console.error('[Error Data]', errorData);
                    
                    if (res.status === 400) {
                        throw new Error(`API_400|Bad request format`);
                    } else if (res.status === 401 || res.status === 403) {
                        throw new Error(`API_${res.status}|Authentication failed`);
                    } else if (res.status === 429) {
                        throw new Error(`API_429|Rate limit reached`);
                    } else if (res.status >= 500) {
                        throw new Error(`API_${res.status}|Service error`);
                    } else {
                        throw new Error(`API_${res.status}|Unknown error`);
                    }
                }

                const data = await res.json();
                console.log('[API Response]', data);

                const candidate = data.candidates?.[0];
                
                if (!candidate) {
                    throw new Error('EMPTY_RESPONSE|No candidates in response');
                }
                
                if (candidate.finishReason === 'SAFETY') {
                    throw new Error('CONTENT_BLOCKED|Response blocked by safety filters');
                }
                
                if (!candidate.content?.parts?.[0]?.text) {
                    console.error('[No Text]', candidate);
                    throw new Error('EMPTY_TEXT|No text in response');
                }
                
                const text = candidate.content.parts[0].text.trim();
                console.log('[Response Text]', text.substring(0, 200));
                
                return text;
                
            } catch (e) {
                console.error(`[Attempt ${i + 1} Failed]`, e.message);
                lastError = e;
                
                // Don't retry auth errors
                if (e.message.includes('API_401') || 
                    e.message.includes('API_403') || 
                    e.message.includes('API_400')) {
                    throw e;
                }
                
                if (i < delays.length) {
                    console.log(`[Retry] Waiting ${delays[i]}ms...`);
                    await new Promise(r => setTimeout(r, delays[i]));
                }
            }
        }
        
        console.error('[All Retries Failed]', lastError);
        throw lastError;
    },

    addMessageToChat(text, sender, saveToHistory = true) {
        const timestamp = Date.now();
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        
        if (sender === 'character') {
            const character = this.characters[this.state.selectedCharacter];
            const avatarDiv = document.createElement('div');
            avatarDiv.className = 'message-avatar';
            const avatarImg = document.createElement('img');
            avatarImg.src = character.image;
            avatarImg.alt = character.name;
            avatarImg.className = 'message-avatar-image';
            avatarDiv.appendChild(avatarImg);
            messageDiv.appendChild(avatarDiv);
        }
        
        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'message-content';
        
        const bubbleDiv = document.createElement('div');
        bubbleDiv.className = 'message-bubble';
        
        // Format text with proper markdown-style formatting
        const formattedText = this.formatMessageText(text);
        bubbleDiv.innerHTML = formattedText;
        contentWrapper.appendChild(bubbleDiv);
        
        const timestampDiv = document.createElement('div');
        timestampDiv.className = 'message-timestamp';
        timestampDiv.textContent = this.formatTimestamp(timestamp);
        contentWrapper.appendChild(timestampDiv);
        
        messageDiv.appendChild(contentWrapper);
        
        this.DOM.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
        
        if (saveToHistory && this.state.selectedCharacter) {
            if (!this.state.conversationHistory[this.state.selectedCharacter]) {
                this.state.conversationHistory[this.state.selectedCharacter] = [];
            }
            this.state.conversationHistory[this.state.selectedCharacter].push({
                text,
                sender,
                timestamp
            });
            this.saveState();
        }
    },

    formatMessageText(text) {
        // Convert ***text*** to <strong><em>text</em></strong> (bold + italic)
        let formatted = text.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');

        // Convert **text** to <strong>text</strong> (bold)
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Convert *text* to <em>text</em> (italic/action text)
        formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

        // Preserve line breaks
        formatted = formatted.replace(/\n/g, '<br>');
        
        return formatted;
    },

    setTyping(isTyping) {
        if (isTyping) {
            this.DOM.typingIndicator.classList.remove('hidden');
        } else {
            this.DOM.typingIndicator.classList.add('hidden');
        }
        this.scrollToBottom();
    },

    scrollToBottom() {
        setTimeout(() => {
            this.DOM.chatMessages.scrollTop = this.DOM.chatMessages.scrollHeight;
        }, 100);
    },

    autoResize(textarea) {
        textarea.style.height = 'auto';
        textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    },

    goBack(viewName) {
        // Prevent going back to landing or apiKey once setup is complete
        if (this.state.apiKey && (viewName === 'landing' || viewName === 'apiKey')) {
            return;
        }
        this.transition(viewName);
    },

    clearCurrentChat() {
        if (!this.state.selectedCharacter) return;
        
        const character = this.characters[this.state.selectedCharacter];
        if (confirm(`Clear all messages with ${character.name}? This cannot be undone.`)) {
            this.state.conversationHistory[this.state.selectedCharacter] = [];
            this.saveState();
            this.DOM.chatMessages.innerHTML = '';
            
            // Send greeting again
            this.sendGreeting();
        }
    },

    exportChat() {
        if (!this.state.selectedCharacter) return;
        
        const character = this.characters[this.state.selectedCharacter];
        const history = this.state.conversationHistory[this.state.selectedCharacter] || [];
        
        if (history.length === 0) {
            alert('No messages to export!');
            return;
        }
        
        // Build the text file content
        let content = `Chat with ${character.name}\n`;
        content += `Exported: ${new Date().toLocaleString()}\n`;
        content += `${'='.repeat(50)}\n\n`;
        
        history.forEach(msg => {
            const timestamp = this.formatTimestamp(msg.timestamp);
            const sender = msg.sender === 'user' ? 'You' : character.name;
            content += `[${timestamp}] ${sender}:\n${msg.text}\n\n`;
        });
        
        // Create and download the file
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-${character.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    reset() {
        if (confirm('This will clear all your data and conversations. Are you sure?')) {
            localStorage.removeItem('anime_chat_state');
            location.reload();
        }
    }
};

// Initialize app
window.app = App;
document.addEventListener('DOMContentLoaded', () => App.init());
