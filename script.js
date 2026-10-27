
    var cards = [
        {
            q: "What does HTML stand for?",
            a: "HyperText Markup Language"
        },
        {
            q: "What does CSS stand for?",
            a: "Cascading Style Sheets"
        },
        {
            q: "What does JS stand for?",
            a: "JavaScript"
        }
    ];

    var index = 0;
    var showingAnswer = false;
    var editing = false;

    function render() {
        if (cards.length === 0) {
            document.getElementById("cardText").textContent =
                "No cards available. Add a new card!";
            document.getElementById("counter").textContent =
                "Card 0 of 0";
            return;
        }

        var card = cards[index];

        document.getElementById("cardText").textContent =
            showingAnswer ? card.a : card.q;

        document.getElementById("counter").textContent =
            "Card " + (index + 1) + " of " + cards.length;
    }

    function flip() {
        if (cards.length === 0) return;

        showingAnswer = !showingAnswer;
        render();
    }

    function next() {
        if (index < cards.length - 1) {
            index++;
            showingAnswer = false;
            render();
        }
    }

    function prev() {
        if (index > 0) {
            index--;
            showingAnswer = false;
            render();
        }
    }

    function addcard() {
        var question = document.getElementById("questionInput").value.trim();
        var answer = document.getElementById("answerInput").value.trim();
        var message = document.getElementById("message");

        if (question === "" || answer === "") {
            message.textContent = "Please enter both question and answer.";
            return;
        }

        if (editing) {
            cards[index].q = question;
            cards[index].a = answer;
            message.textContent = "Card updated successfully!";
        } else {
            cards.push({ q: question, a: answer });
            index = cards.length - 1;
            message.textContent = "Card added successfully!";
        }

        showingAnswer = false;
        canceledit();
        render();
    }

    function editcard() {
        if (cards.length === 0) return;

        document.getElementById("questionInput").value = cards[index].q;
        document.getElementById("answerInput").value = cards[index].a;

        editing = true;

        document.getElementById("savebtn").textContent = "Save Changes";
        document.getElementById("cancelbtn").hidden = false;
        document.querySelector(".card-form h2").textContent = "Edit card";
        document.getElementById("message").textContent =
            "Change the question or answer, then save.";
    }

    function deletecard() {
        if (cards.length === 0) return;

        var confirmed = confirm("Are you sure you want to delete this card?");

        if (!confirmed) return;

        cards.splice(index, 1);

        if (index >= cards.length) {
            index = Math.max(0, cards.length - 1);
        }

        showingAnswer = false;

        document.getElementById("message").textContent =
            "Card deleted.";

        canceledit();
        render();
    }

    function canceledit() {
        editing = false;

        document.getElementById("questionInput").value = "";
        document.getElementById("answerInput").value = "";

        document.getElementById("savebtn").textContent = "Add card";
        document.getElementById("cancelbtn").hidden = true;
        document.querySelector(".card-form h2").textContent =
            "Add or edit a card";
    }

    render();
