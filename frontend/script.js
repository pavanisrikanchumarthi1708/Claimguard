/* =========================================================
   CLAIMGUARD
   Dashboard JavaScript
   ========================================================= */


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       CLOCK
       ===================================================== */

    const clockElement =
        document.getElementById("clock");

    const dateElement =
        document.getElementById("date");


    function updateClock() {

        const now = new Date();


        clockElement.textContent =
            now.toLocaleTimeString(
                "en-IN",
                {
                    hour12: false
                }
            );


        dateElement.textContent =
            now.toLocaleDateString(
                "en-IN",
                {
                    weekday: "short",
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

    }


    updateClock();

    setInterval(updateClock, 1000);



    /* =====================================================
       SIDEBAR NAVIGATION
       ===================================================== */

    const navItems =
        document.querySelectorAll(".nav-item[data-section]");

    const sections =
        document.querySelectorAll(".page-section");

    const pageTitle =
        document.getElementById("pageTitle");


    const titles = {

        dashboard:
            "ClaimGuard Dashboard",

        claims:
            "Claims Review Queue",

        fraud:
            "Fraud Detection Center",

        network:
            "Claimant-Claim Network",

        ai:
            "AI Claim Analysis",

        analytics:
            "Claims Analytics",

        settings:
            "ClaimGuard Settings"

    };


    function showSection(sectionId) {


        sections.forEach(section => {

            section.classList.remove(
                "active-section"
            );

        });


        const target =
            document.getElementById(sectionId);


        if (target) {

            target.classList.add(
                "active-section"
            );

        }


        navItems.forEach(item => {

            item.classList.remove("active");


            if (
                item.dataset.section ===
                sectionId
            ) {

                item.classList.add("active");

            }

        });


        pageTitle.textContent =
            titles[sectionId] ||
            "ClaimGuard Dashboard";


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        closeMobileSidebar();

    }


    navItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                showSection(
                    item.dataset.section
                );

            }
        );

    });



    /* =====================================================
       BUTTONS THAT NAVIGATE TO SECTIONS
       ===================================================== */

    document
        .querySelectorAll(
            "[data-section-target]"
        )
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    showSection(
                        button.dataset.sectionTarget
                    );

                }
            );

        });



    /* =====================================================
       MOBILE SIDEBAR
       ===================================================== */

    const menuButton =
        document.getElementById("menuButton");

    const sidebar =
        document.getElementById("sidebar");

    const sidebarOverlay =
        document.getElementById("sidebarOverlay");


    function closeMobileSidebar() {

        sidebar.classList.remove("open");

        sidebarOverlay.classList.remove("show");

    }


    menuButton.addEventListener(
        "click",
        () => {

            sidebar.classList.toggle("open");

            sidebarOverlay.classList.toggle(
                "show"
            );

        }
    );


    sidebarOverlay.addEventListener(
        "click",
        closeMobileSidebar
    );



    /* =====================================================
       NOTIFICATIONS
       ===================================================== */

    const notificationButton =
        document.getElementById(
            "notificationButton"
        );

    const notificationPanel =
        document.getElementById(
            "notificationPanel"
        );

    const closeNotifications =
        document.getElementById(
            "closeNotifications"
        );


    notificationButton.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );


    closeNotifications.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );


    document.addEventListener(
        "click",
        event => {

            if (
                !notificationPanel.contains(event.target) &&
                event.target !== notificationButton
            ) {

                notificationPanel.classList.remove(
                    "show"
                );

            }

        }
    );



    /* =====================================================
       CLAIM DATA
       ===================================================== */

    let claims = [

        {
            id: "CLM-1008",
            claimant: "Rajesh Kumar",
            policy: "POL-7842",
            amount: 875000,
            previous: 250000,
            score: 91,
            risk: "high"
        },

        {
            id: "CLM-1007",
            claimant: "Ananya Rao",
            policy: "POL-5621",
            amount: 420000,
            previous: 310000,
            score: 64,
            risk: "medium"
        },

        {
            id: "CLM-1006",
            claimant: "Suresh Patel",
            policy: "POL-3398",
            amount: 125000,
            previous: 220000,
            score: 18,
            risk: "low"
        },

        {
            id: "CLM-1005",
            claimant: "Priya Sharma",
            policy: "POL-9274",
            amount: 680000,
            previous: 290000,
            score: 83,
            risk: "high"
        },

        {
            id: "CLM-1004",
            claimant: "Arjun Reddy",
            policy: "POL-4182",
            amount: 315000,
            previous: 275000,
            score: 47,
            risk: "medium"
        },

        {
            id: "CLM-1003",
            claimant: "Sneha Rao",
            policy: "POL-7751",
            amount: 95000,
            previous: 180000,
            score: 11,
            risk: "low"
        },

        {
            id: "CLM-1002",
            claimant: "Vikram Singh",
            policy: "POL-6234",
            amount: 720000,
            previous: 280000,
            score: 88,
            risk: "high"
        },

        {
            id: "CLM-1001",
            claimant: "Meena Devi",
            policy: "POL-1903",
            amount: 160000,
            previous: 190000,
            score: 15,
            risk: "low"
        }

    ];



    /* =====================================================
       CLAIM TABLE
       ===================================================== */

    const tableBody =
        document.getElementById(
            "claimsTableBody"
        );


    const searchInput =
        document.getElementById(
            "claimSearch"
        );


    const riskFilter =
        document.getElementById(
            "riskFilter"
        );


    function formatCurrency(value) {

        return "₹" +
            Number(value).toLocaleString(
                "en-IN"
            );

    }


    function getRiskBadge(risk) {

        const text =
            risk.toUpperCase();


        return `
            <span class="risk-badge ${risk}">
                ${text}
            </span>
        `;

    }


    function renderClaims() {


        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        const selectedRisk =
            riskFilter.value;


        const filtered =
            claims.filter(claim => {


                const matchesSearch =

                    claim.id
                        .toLowerCase()
                        .includes(search)

                    ||

                    claim.claimant
                        .toLowerCase()
                        .includes(search)

                    ||

                    claim.policy
                        .toLowerCase()
                        .includes(search);


                const matchesRisk =

                    selectedRisk === "all" ||
                    claim.risk === selectedRisk;


                return (
                    matchesSearch &&
                    matchesRisk
                );

            });


        tableBody.innerHTML = "";


        filtered.forEach(claim => {

            const row =
                document.createElement("tr");


            row.innerHTML = `

                <td>
                    <strong>${claim.id}</strong>
                </td>

                <td>
                    ${claim.claimant}
                </td>

                <td>
                    ${claim.policy}
                </td>

                <td>
                    ${formatCurrency(claim.amount)}
                </td>

                <td>
                    ${formatCurrency(claim.previous)}
                </td>

                <td>

                    <span class="score ${
                        claim.risk === "high"
                            ? "high-score"
                            : claim.risk === "medium"
                                ? "medium-score"
                                : "low-score"
                    }">

                        ${claim.score}%

                    </span>

                </td>

                <td>
                    ${getRiskBadge(claim.risk)}
                </td>

                <td>

                    <button
                        class="secondary-button view-claim"
                        data-id="${claim.id}">

                        View

                    </button>

                </td>

            `;


            tableBody.appendChild(row);

        });


        document
            .querySelectorAll(".view-claim")
            .forEach(button => {

                button.addEventListener(
                    "click",
                    () => {

                        const id =
                            button.dataset.id;

                        showClaimDetails(id);

                    }
                );

            });

    }


    renderClaims();


    searchInput.addEventListener(
        "input",
        renderClaims
    );


    riskFilter.addEventListener(
        "change",
        renderClaims
    );


    document
        .getElementById("refreshClaims")
        .addEventListener(
            "click",
            () => {

                renderClaims();

                showToast(
                    "Claims queue refreshed successfully."
                );

            }
        );



    /* =====================================================
       CLAIM DETAILS
       ===================================================== */

    function showClaimDetails(id) {

        const claim =
            claims.find(
                item => item.id === id
            );


        if (!claim) {
            return;
        }


        showToast(
            `${claim.id} | ${claim.claimant} | Fraud Score: ${claim.score}%`
        );

    }



    /* =====================================================
       ADD CLAIM MODAL
       ===================================================== */

    const claimModal =
        document.getElementById(
            "claimModal"
        );


    const addClaimButton =
        document.getElementById(
            "addClaimButton"
        );


    const modalClose =
        document.getElementById(
            "modalClose"
        );


    addClaimButton.addEventListener(
        "click",
        () => {

            claimModal.classList.add(
                "show"
            );

        }
    );


    modalClose.addEventListener(
        "click",
        () => {

            claimModal.classList.remove(
                "show"
            );

        }
    );


    claimModal.addEventListener(
        "click",
        event => {

            if (
                event.target === claimModal
            ) {

                claimModal.classList.remove(
                    "show"
                );

            }

        }
    );



    /* =====================================================
       ADD NEW CLAIM
       ===================================================== */

    const claimForm =
        document.getElementById(
            "claimForm"
        );


    claimForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const claimant =
                document.getElementById(
                    "newClaimant"
                ).value.trim();


            const policy =
                document.getElementById(
                    "newPolicy"
                ).value.trim();


            const amount =
                Number(
                    document.getElementById(
                        "newAmount"
                    ).value
                );


            if (
                !claimant ||
                !policy ||
                !amount
            ) {

                return;

            }


            const previous =
                Math.round(
                    amount * 0.55
                );


            const ratio =
                amount / previous;


            let score =
                Math.min(
                    98,
                    Math.round(
                        ratio * 30
                    )
                );


            let risk =
                "low";


            if (score >= 70) {

                risk = "high";

            } else if (score >= 40) {

                risk = "medium";

            }


            const nextNumber =
                1009 + claims.length;


            claims.unshift({

                id:
                    "CLM-" +
                    nextNumber,

                claimant,

                policy,

                amount,

                previous,

                score,

                risk

            });


            renderClaims();


            claimForm.reset();


            claimModal.classList.remove(
                "show"
            );


            showToast(
                "New claim added to ClaimGuard queue."
            );

        }
    );



    /* =====================================================
       FRAUD ANALYSIS
       ===================================================== */

    const analyzeButton =
        document.getElementById(
            "analyzeButton"
        );


    const analysisStatus =
        document.getElementById(
            "analysisStatus"
        );


    const analysisScore =
        document.getElementById(
            "analysisScore"
        );


    const aiConsole =
        document.getElementById(
            "aiConsole"
        );


    analyzeButton.addEventListener(
        "click",
        async () => {


            analyzeButton.disabled =
                true;


            analyzeButton.textContent =
                "⟳ Analyzing Claims...";


            analysisStatus.textContent =
                "RUNNING";


            addConsoleMessage(
                "[SYSTEM] Starting fraud analysis..."
            );


            await wait(700);


            addConsoleMessage(
                "[JAVA] Loading claimant-claim graph..."
            );


            await wait(700);


            addConsoleMessage(
                "[AGENT] Applying rational-agent rules..."
            );


            await wait(700);


            addConsoleMessage(
                "[PYTHON] Running outlier detection..."
            );


            await wait(900);


            addConsoleMessage(
                "[PYTHON] Fraud scores generated."
            );


            analysisStatus.textContent =
                "COMPLETED";


            analysisScore.textContent =
                "91%";


            analyzeButton.disabled =
                false;


            analyzeButton.textContent =
                "✓ Analysis Completed";


            showToast(
                "ClaimGuard fraud analysis completed."
            );


            setTimeout(() => {

                analyzeButton.textContent =
                    "✦ Run Fraud Analysis";

            }, 2500);

        }
    );



    function addConsoleMessage(message) {

        const p =
            document.createElement("p");


        const parts =
            message.match(
                /^\[(.*?)\](.*)$/
            );


        if (parts) {

            p.innerHTML = `
                <span>
                    [${parts[1]}]
                </span>
                ${parts[2]}
            `;

        } else {

            p.textContent =
                message;

        }


        aiConsole.appendChild(p);


        aiConsole.scrollTop =
            aiConsole.scrollHeight;

    }



    function wait(ms) {

        return new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    ms
                )
        );

    }



    /* =====================================================
       BACKGROUND TOGGLE
       ===================================================== */

    const backgroundToggle =
        document.getElementById(
            "backgroundToggle"
        );


    backgroundToggle.addEventListener(
        "change",
        () => {

            document
                .querySelector(
                    ".background-animation"
                )
                .style.display =
                    backgroundToggle.checked
                        ? "block"
                        : "none";

        }
    );



    /* =====================================================
       LOGOUT DEMO
       ===================================================== */

    document
        .getElementById("logoutButton")
        .addEventListener(
            "click",
            () => {

                showToast(
                    "Demo logout activated."
                );

            }
        );



    /* =====================================================
       TOAST
       ===================================================== */

    function showToast(message) {


        const existing =
            document.querySelector(
                ".claimguard-toast"
            );


        if (existing) {
            existing.remove();
        }


        const toast =
            document.createElement("div");


        toast.className =
            "claimguard-toast";


        toast.textContent =
            message;


        Object.assign(
            toast.style,
            {

                position: "fixed",

                bottom: "25px",

                right: "25px",

                zIndex: "5000",

                padding: "13px 18px",

                borderRadius: "12px",

                background: "#0d1c30",

                color: "#f8fafc",

                border:
                    "1px solid rgba(56,189,248,.25)",

                boxShadow:
                    "0 15px 40px rgba(0,0,0,.35)",

                fontSize: "11px",

                animation:
                    "modalIn .3s ease"

            }
        );


        document.body.appendChild(
            toast
        );


        setTimeout(() => {

            toast.remove();

        }, 3000);

    }



    /* =====================================================
       KEYBOARD ESCAPE
       ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape"
            ) {

                claimModal.classList.remove(
                    "show"
                );

                notificationPanel.classList.remove(
                    "show"
                );

                closeMobileSidebar();

            }

        }
    );


});

