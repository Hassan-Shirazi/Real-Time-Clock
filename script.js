    // === JAVASCRIPT LOGIC ===

        // DOM elements ko select karna
        const hourHand = document.querySelector('.hour-hand');
        const minuteHand = document.querySelector('.minute-hand');
        const secondHand = document.querySelector('.second-hand');
        const digitalClockDisplay = document.getElementById('digital-clock');

        // Clock ko set karne wala function
        function setClock() {
            const now = new Date();

            // Analog Clock ke liye time nikalna
            const seconds = now.getSeconds();
            const minutes = now.getMinutes();
            const hours = now.getHours();

            // Degree (rotation) calculate karna
            // Smooth movement ke liye fractional values ka use kiya gaya hai
            const secondsDegrees = (seconds / 60) * 360;
            const minutesDegrees = (minutes / 60) * 360 + (seconds / 60) * 6;
            const hoursDegrees = (hours / 12) * 360 + (minutes / 60) * 30;
            
            // Special case handle karna: jab second hand 59 se 0 par jati hai
            // to reverse animation na ho, isliye transition ko temporarily remove karte hain.
            if (secondsDegrees === 0) {
                secondHand.style.transition = 'none';
            } else {
                // Smooth transition ko wapas apply karna
                secondHand.style.transition = 'transform 0.05s cubic-bezier(0.4, 2.0, 0.58, 1)';
            }

            // CSS transform property se hands ko rotate karna
            hourHand.style.transform = `translateX(-50%) rotate(${hoursDegrees}deg)`;
            minuteHand.style.transform = `translateX(-50%) rotate(${minutesDegrees}deg)`;
            secondHand.style.transform = `translateX(-50%) rotate(${secondsDegrees}deg)`;

            // --- Digital Clock Logic ---
            
            // 12-hour format ke liye hours convert karna
            let displayHours = hours % 12;
            displayHours = displayHours ? displayHours : 12; // 0 baje ko 12 banana

            const ampm = hours >= 12 ? 'PM' : 'AM';

            // Agar number 10 se chhota ho to '0' add karna (e.g., 09, 05)
            const displayMinutes = String(minutes).padStart(2, '0');
            const displaySeconds = String(seconds).padStart(2, '0');
            const displayPaddedHours = String(displayHours).padStart(2, '0');

            // Digital clock ke text ko update karna
            digitalClockDisplay.textContent = `${displayPaddedHours}:${displayMinutes}:${displaySeconds} ${ampm}`;
        }

        // Shuru me ek baar function call karna taki page load hote hi clock set ho jaye
        setClock();

        // Har second (1000ms) par setClock function ko call karna
        setInterval(setClock, 1000);