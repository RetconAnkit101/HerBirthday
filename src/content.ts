/**
 * Everything you might want to change lives here — names, captions, the form link.
 * Nothing below this file needs editing to personalise the site.
 */

export const config = {
  /** Her name / nickname, used across the site. */
  herName: 'Sweetheart',
  /** Your name, shown in the signature at the end. */
  yourName: 'Ankit',
  /**
   * Google Form embed link. In Google Forms: Send -> < > (embed) -> copy the src="..." URL.
   * It looks like https://docs.google.com/forms/d/e/FORM_ID/viewform?embedded=true
   * Leave empty and the site shows a gentle placeholder instead of a broken frame.
   */
  googleFormUrl: '',
} as const

export const photos = {
  hero: '/photos/hero.webp',
  cutest: '/photos/cutest.webp',
  prettiest: '/photos/prettiest.webp',
  sassiestBoy: '/photos/sassiest-boy.webp',
  sassiestGirl: '/photos/sassiest-girl.webp',
  together: '/photos/together.webp',
  dateAsk: '/photos/date-ask.webp',
  dateConfirmed: '/photos/date-confirmed.webp',
  us: [
    '/photos/us-1.webp',
    '/photos/us-2.webp',
    '/photos/us-3.webp',
    '/photos/us-4.webp',
    '/photos/us-5.webp',
  ],
} as const

export const copy = {
  gate: {
    kicker: 'psst… something is waiting for you',
    button: 'Tap to open',
    hint: 'made entirely for you',
  },
  hero: {
    eyebrow: 'today the world got prettier',
    title: 'Happy Birthday',
    lines: [
      'to my favourite person,',
      'to the reason I look up at the sky and smile,',
      'to the one I want every next year with.',
    ],
    scrollHint: 'scroll, there is more',
  },
  birthdayGirl: {
    eyebrow: 'chapter one',
    title: 'The birthday girl',
    body: 'Officially one year older, unfairly one year cuter. The candles do not stand a chance.',
    cutestCaption: 'cutest',
    prettiestCaption: 'prettiest',
  },
  sassiest: {
    eyebrow: 'chapter two',
    title: 'Sassiest boy, sassiest girl',
    body: 'You have attitude, I have attitude. Somehow it works out perfectly.',
    boy: 'sassiest boy',
    girl: 'sassiest girl',
    verdict: 'a matched set, obviously',
  },
  together: {
    eyebrow: 'chapter three',
    title: 'I want to be with you',
    lines: [
      'Not just today, not just for the birthday photos.',
      'For the ordinary evenings, the long drives, the bad jokes,',
      'the mall mirrors and the skies we keep photographing.',
      'Every version of you — I want to be around for all of them.',
    ],
    galleryTitle: 'us, collecting days',
  },
  date: {
    eyebrow: 'chapter four',
    title: 'So… will you go on a date with me?',
    body: 'I made it official. One honest question, two buttons. Only one of them is going to work, though.',
    formEyebrow: 'your turn',
    formHeading: 'The very official date question',
    formSubheading: 'one question, zero pressure',
    question: 'Will you go on a date with me?',
    yesLabel: 'Yes',
    noLabel: 'No',
    /** Shown after she taps No — after this, only Yes is left on screen. */
    noReply: 'This is not how heaven works. Keeping only yes, then.',
    yesReveal: 'date confirmed',
    when: 'Sunday, 16 / 08 / 2026 · 7:00 PM',
    pickup: 'I will pick you up.',
    presentNote:
      'And your man will be waiting with your birthday present — picked out with all his love and his whole heart.',
  },
  outro: {
    line: 'Happy birthday, my love.',
    signature: 'yours, always',
  },
} as const
