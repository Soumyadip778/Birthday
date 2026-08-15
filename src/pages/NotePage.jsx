import React from "react";
import { useNavigate } from "react-router-dom";
import "./NotePage.css";

function NotePage() {
  const navigate = useNavigate();

  return (
    <main className="note-page">

      <div className="note-content">

        {/* Heading */}

        <p className="note-eyebrow">
          FROM MY HEART
        </p>

        <h1>A note for you</h1>

        <div className="note-divider" />


        {/* Paper */}

        <article className="letter-paper">

          <div className="paper-content">

            <div className="letter-date">
              16th AUGUST 2026
            </div>

            <h2>
              My dearest Priyani ,
            </h2>

            <p>
              Happy 19th Birthday to you! 🎂❤️

Thank you for accepting this pagal, immature, and sometimes completely stupid boy as your best friend. 😂🫂

I genuinely don't know how you managed to tolerate me this long. 😭😂 But I'm really, really glad you did. ❤️

Out of all the people I could have met, I'm so lucky that I met you. 🥹✨

No matter how much we argue, tease each other, or act completely crazy, I'll always be grateful for this friendship. 🫶🏻

Happy Birthday, bestie. Stay the same crazy person you are. ❤️🎂✨
            </p>

            <p>
             The moment you entered my life, something about it just became a little more special. 🥹❤️ You didn't just become a friend to me—you became someone with whom I could share the randomest things, the happiest things, the stupidest things, and even the things I don't usually tell people. 🫂✨

You genuinely taught me what “female friendship” means. 😂💗 And honestly, I never expected that walking into Aru da's place that day would somehow lead me to meeting you—the girl who would become so important to me and eventually start calling me “Chaglu” 😭😂❤️

Looking back, it's actually crazy how naturally everything happened. From barely knowing each other to telling each other about almost everything happening in our lives… somehow we went from strangers to this. 🥹🫶🏻

We laugh at the most ridiculous things, argue over the stupidest things, share things that probably nobody else would understand, and somehow still come back and continue talking like nothing happened. 😂😭 That's what makes our friendship so us. 🤍

You are genuinely one of the best parts of my life. ❤️ I feel incredibly lucky that I got to meet you, not some version of you, but the real you—with all your craziness, your kindness, your little habits, your way of talking, and everything that makes you you. 🫶🏻🌸

And yes, you are absolutely gorgeous. 🥹✨ But what makes you even more beautiful to me is the person you are from the inside. ❤️

I don't know where life will take us or how many things will change along the way, but I really hope this friendship remains one of those things I can always look back on and smile about. 🫂💗

I'm really, really glad that day at Aru da's place happened. Because otherwise, I might never have met my favourite “Chaglu-calling” person. 😂❤️

Happy Birthday, you crazy human. 🥹🎂❤️

            </p>

            <p>
              You are one of those people who make my life better just by being a part of it. ❤️ Thank you for always supporting me through my ups and downs, for listening to me, and for simply being there. 🫂

We have laughed a lot, we have quarrelled a lot—yes, really a LOT 😂😭—and somehow, after everything, we're still here, still talking, still annoying each other, and still being best friends. 🥹❤️

We've already come a long way together, and when I look back at everything we've shared, I can't help but feel grateful that I got to have you by my side. 🫶🏻

And honestly, I hope this is only the beginning. We still have so much more to experience, laugh about, argue about, and eventually look back on together. 🤍✨

We've come this far together, and I hope we have much, much further to go. ❤️🫂
            </p>

            <p>
              So many immature and silly talks with you . 
              Thanks for being my support system .
              God bless you dear.
              Stay happy Idiot cause you are the ultimate source of my happiness.
            </p>

            <p>
             We've had so many immature, silly, and completely random talks together. 😂❤️ Some of them make absolutely no sense, but somehow those are the conversations I'll probably remember the most. 🥹

Thank you for being my support system through everything. 🫂❤️ For listening to me, putting up with me, and being there when I needed someone.

God bless you, dear. 🤍✨ I genuinely wish that you always stay happy, keep smiling, and get all the happiness you deserve. 🌸

And yes, stay happy, idiot, because whether you realise it or not, you are one of the biggest sources of my happiness. 😂❤️

So please keep being the crazy, amazing person you are. 🫶🏻🎂✨
            </p>

            <div className="letter-signature">
              Forever yours,
              <br />
              <span>Your Chaglu (Soumyadip) ❤️</span>
            </div>

          </div>

          {/* Flower */}

          <div className="paper-flower">
            🌸
          </div>

        </article>


        {/* Continue */}

        <button
          className="note-continue"
          onClick={() => navigate("/final")}
        >
          Continue →
        </button>

      </div>

    </main>
  );
}

export default NotePage;