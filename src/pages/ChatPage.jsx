import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { findGuideById } from '../data/categories'
import { useLanguage } from '../i18n/LanguageContext'
import './ChatPage.css'

async function askChat(messages) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  })

  const data = await res.json()
  if (!res.ok) {
    throw new Error(data?.error || `Chat error (${res.status})`)
  }

  return data.content?.trim() || ''
}

function getSpeechRecognition() {
  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null
  return SpeechRecognition ? new SpeechRecognition() : null
}

function speakText(text, { lang = 'en-US', onEnd } = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null
  window.speechSynthesis.cancel()
  const utter = new SpeechSynthesisUtterance(text)
  utter.lang = lang
  utter.rate = 1
  if (onEnd) utter.onend = onEnd
  window.speechSynthesis.speak(utter)
  return utter
}

function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel()
  }
}

export default function ChatPage() {
  const { guideId } = useParams()
  const { t, categoryName, speechLang, lang } = useLanguage()
  const guide = useMemo(() => findGuideById(guideId), [guideId])
  const title = guide?.nameKey
    ? categoryName(guide.nameKey)
    : t('chat.guideFallback')
  const listRef = useRef(null)
  const recognitionRef = useRef(null)

  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [listening, setListening] = useState(false)
  const [speaking, setSpeaking] = useState(false)
  const [autoSpeak, setAutoSpeak] = useState(true)
  const [voiceSupported, setVoiceSupported] = useState(true)
  const [error, setError] = useState('')
  const [messages, setMessages] = useState([])

  const systemPrompt = useMemo(
    () => t('chat.systemPrompt', { title }),
    [t, title],
  )

  useEffect(() => {
    const supported = !!(
      (typeof window !== 'undefined' &&
        (window.SpeechRecognition || window.webkitSpeechRecognition)) ||
      (typeof window !== 'undefined' && window.speechSynthesis)
    )
    setVoiceSupported(supported)
  }, [])

  useEffect(() => {
    stopSpeaking()
    setSpeaking(false)
    setListening(false)
    recognitionRef.current?.stop?.()
    setMessages([
      {
        role: 'assistant',
        content: t('chat.greeting', { title }),
      },
    ])
    setInput('')
    setError('')
  }, [guideId, title, t, lang])

  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, busy, listening])

  useEffect(() => {
    return () => {
      stopSpeaking()
      recognitionRef.current?.stop?.()
    }
  }, [])

  const playAssistant = useCallback(
    (text) => {
      if (!text) return
      setSpeaking(true)
      speakText(text, {
        lang: speechLang,
        onEnd: () => setSpeaking(false),
      })
    },
    [speechLang],
  )

  const sendText = useCallback(
    async (rawText) => {
      const text = rawText.trim()
      if (!text || busy) return

      stopSpeaking()
      setSpeaking(false)

      const nextUser = { role: 'user', content: text }
      const history = [...messages, nextUser]
      setMessages(history)
      setInput('')
      setBusy(true)
      setError('')

      try {
        const reply = await askChat([
          { role: 'system', content: systemPrompt },
          ...history.map(({ role, content }) => ({ role, content })),
        ])
        setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
        if (autoSpeak) playAssistant(reply)
      } catch (err) {
        setError(err.message || t('chat.somethingWrong'))
      } finally {
        setBusy(false)
      }
    },
    [autoSpeak, busy, messages, playAssistant, systemPrompt, t],
  )

  const send = async (e) => {
    e?.preventDefault()
    await sendText(input)
  }

  const toggleMic = () => {
    if (busy) return

    if (listening) {
      recognitionRef.current?.stop?.()
      setListening(false)
      return
    }

    const recognition = getSpeechRecognition()
    if (!recognition) {
      setError(t('chat.voiceUnsupported'))
      return
    }

    stopSpeaking()
    setSpeaking(false)
    setError('')

    recognition.lang = speechLang
    recognition.interimResults = true
    recognition.continuous = false

    recognition.onstart = () => setListening(true)
    recognition.onerror = (event) => {
      setListening(false)
      if (event.error !== 'aborted' && event.error !== 'no-speech') {
        setError(t('chat.micError', { error: event.error }))
      }
    }
    recognition.onend = () => setListening(false)
    recognition.onresult = (event) => {
      let transcript = ''
      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        transcript += event.results[i][0].transcript
      }
      const finalText = transcript.trim()
      setInput(finalText)
      const isFinal = event.results[event.results.length - 1]?.isFinal
      if (isFinal && finalText) {
        sendText(finalText)
      }
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const toggleSpeakMessage = (text) => {
    if (speaking) {
      stopSpeaking()
      setSpeaking(false)
      return
    }
    playAssistant(text)
  }

  return (
    <div className="chat-page">
      <div className="chat-page-inner chat-page-inner--text">
        <div className="chat-heading">
          <Link to={guide?.sectionPath || '/'} className="chat-back">
            {t('chat.back')}
          </Link>
          <h1 className="chat-title">{title}</h1>
          <p className="chat-subtitle">
            {t('chat.subtitle')}{' '}
            {voiceSupported ? '' : t('chat.voiceLimited')}
          </p>
          <label className="chat-auto-speak">
            <input
              type="checkbox"
              checked={autoSpeak}
              onChange={(e) => setAutoSpeak(e.target.checked)}
            />
            {t('chat.autoSpeak')}
          </label>
        </div>

        <div className="text-chat">
          <div className="text-chat-messages" ref={listRef}>
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`text-chat-bubble text-chat-bubble--${msg.role}`}
              >
                <div className="text-chat-bubble-text">{msg.content}</div>
                {msg.role === 'assistant' ? (
                  <button
                    type="button"
                    className="text-chat-speak-btn"
                    onClick={() => toggleSpeakMessage(msg.content)}
                    aria-label={speaking ? t('chat.stopAria') : t('chat.speakAria')}
                  >
                    {speaking ? t('chat.stop') : t('chat.speak')}
                  </button>
                ) : null}
              </div>
            ))}
            {busy ? (
              <div className="text-chat-bubble text-chat-bubble--assistant text-chat-typing">
                {t('chat.thinking')}
              </div>
            ) : null}
            {listening ? (
              <div className="text-chat-bubble text-chat-bubble--user text-chat-typing">
                {t('chat.listening')}
              </div>
            ) : null}
          </div>

          {error ? <p className="text-chat-error">{error}</p> : null}

          <form className="text-chat-form" onSubmit={send}>
            <button
              type="button"
              className={`text-chat-mic${listening ? ' is-listening' : ''}`}
              onClick={toggleMic}
              disabled={busy}
              aria-label={listening ? t('chat.micStop') : t('chat.micStart')}
              title={listening ? t('chat.stop') : t('chat.speak')}
            >
              {listening ? '⏹' : '🎤'}
            </button>
            <input
              className="text-chat-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                listening ? t('chat.listening') : t('chat.askAbout', { title })
              }
              disabled={busy}
              autoComplete="off"
            />
            <button
              className="text-chat-send"
              type="submit"
              disabled={busy || !input.trim()}
            >
              {t('chat.send')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
