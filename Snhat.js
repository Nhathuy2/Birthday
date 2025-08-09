document.addEventListener("DOMContentLoaded", () => {
        // --- Elements ---
        const passwordScreen = document.getElementById("passwordScreen");
        const envelopeContainer = document.getElementById("envelopeContainer");
        const mainContent = document.getElementById("mainContent");
        const navItems = document.querySelectorAll(".nav-item");
        const sections = document.querySelectorAll(".content-section");
        const playBtn = document.getElementById("playBtn");
        const volumeSlider = document.getElementById("volumeSlider");
        const backgroundMusic = document.getElementById("backgroundMusic");
        const blowSound = document.getElementById("blowSound");
        const musicInfo = document.getElementById("musicInfo");
        const passwordToggle = document.getElementById("passwordToggle");
        const passwordInput = document.getElementById("passwordInput");

        // --- Wish Section Elements (MODIFIED) ---
        const wishSection = document.getElementById("wish");
        const sendWishBtn = document.getElementById("sendWishBtn");
        const wishTextArea = document.getElementById("wishTextArea");
        const letterContainer = document.getElementById("letterContainer");
        const letterContent = document.getElementById("letterContent");
        const closeLetter = document.getElementById("closeLetter");
        const starrySky = document.getElementById("starrySky");
        const finalMessage = document.getElementById("finalMessage");
        const confirmationMessage = document.getElementById("confirmationMessage");
        
        // --- NEW Wish Confirmation Dialog Elements ---
        const wishConfirmationDialog = document.getElementById("wishConfirmationDialog");
        const wishPreviewText = document.getElementById("wishPreviewText");
        const confirmSendWishBtn = document.getElementById("confirmSendWishBtn");
        const goBackToEditWishBtn = document.getElementById("goBackToEditWishBtn");


        if (passwordToggle && passwordInput) {
          passwordToggle.addEventListener("click", () => {
            if (passwordInput.type === "password") {
              passwordInput.type = "text";
              passwordToggle.classList.remove("fa-eye");
              passwordToggle.classList.add("fa-eye-slash");
            } else {
              passwordInput.type = "password";
              passwordToggle.classList.remove("fa-eye-slash");
              passwordToggle.classList.add("fa-eye");
            }
          });
        }
        // Thiết lập âm lượng ban đầu
        backgroundMusic.volume = volumeSlider.value;
        blowSound.volume = 0.5;

        // Xử lý sự kiện Play/Pause
        playBtn.addEventListener("click", () => {
          if (backgroundMusic.paused) {
            backgroundMusic
              .play()
              .then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicInfo.textContent = "Đang phát: Ngày Đầu Tiên";
              })
              .catch((e) => {
                console.error("Lỗi phát nhạc:", e);
                musicInfo.innerHTML =
                  'Nhấn nút <i class="fas fa-play"></i> để bật nhạc';
              });
          } else {
            backgroundMusic.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
            musicInfo.textContent = "Nhạc đã tạm dừng";
          }
        });

        // Xử lý sự kiện thay đổi âm lượng
        volumeSlider.addEventListener("input", () => {
          backgroundMusic.volume = volumeSlider.value;
          const volumeIcon = volumeSlider.previousElementSibling;
          if (volumeSlider.value == 0) {
            volumeIcon.className = "fas fa-volume-mute";
          } else if (volumeSlider.value < 0.5) {
            volumeIcon.className = "fas fa-volume-down";
          } else {
            volumeIcon.className = "fas fa-volume-up";
          }
        });

        // Tự động bật nhạc khi mở phong bì
        envelope.addEventListener("click", () => {
          envelope.classList.add("open");
          setTimeout(() => {
            envelopeContainer.style.display = "none";
            mainContent.style.display = "flex";
            document.getElementById("musicPlayer").classList.add("show");
            backgroundMusic
              .play()
              .then(() => {
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
                musicInfo.textContent = "Đang phát: Ngày đầu tiên";
              })
              .catch((e) => {
                console.log("Trình duyệt yêu cầu tương tác người dùng:", e);
                musicInfo.innerHTML =
                  'Nhấn nút <i class="fas fa-play"></i> để bật nhạc';
              });
          }, 1500);
        });

        // --- MODIFIED Wish Section Logic ---

        // 1. User clicks "Gửi Điều Ước"
        sendWishBtn.addEventListener("click", () => {
            const wish = wishTextArea.value.trim();
            if (wish === "") {
                alert("Em chưa viết điều ước nào cả!");
                return;
            }
            // Populate and show the confirmation dialog
            wishPreviewText.innerHTML = `"${wish.replace(/\n/g, '<br>')}"`; // Show wish in preview
            wishConfirmationDialog.style.display = 'flex';
            wishSection.style.display = 'none'; // Hide the input section
        });

        // 2. User clicks "Quay Lại" to edit
        goBackToEditWishBtn.addEventListener("click", () => {
            wishConfirmationDialog.style.display = 'none';
            wishSection.style.display = 'block'; // Show the input section again
        });

        // 3. User confirms to send
        confirmSendWishBtn.addEventListener("click", () => {
            wishConfirmationDialog.style.display = 'none'; // Hide confirmation
            const wish = wishTextArea.value.trim();

            // --- Start the sending and animation process ---
            fetch(
                "https://script.google.com/macros/s/AKfycbzmZQ73hFd7bVDvVn50-L7ru8hrZ4PfetSaxAGwuma9BQbquaNAhW9fjQeJXS5lVzoh7A/exec",
                {
                method: "POST",
                contentType: "application/json",
                body: JSON.stringify({ wish: wish }),
                }
            )
            .then((res) => res.text())
            .then((res) => console.log("Đã gửi điều ước về Gmail:", res))
            .catch((err) => console.error(err));

            letterContent.innerHTML = `<p>Điều ước tuổi 18 của em:</p><p>"${wish.replace(/\n/g, '<br>')}"</p>`;
            letterContainer.style.display = "block";
        });

        // 4. Logic for when the letter is closed (This remains the same)
        closeLetter.addEventListener("click", () => {
            letterContainer.classList.add("folding");
            setTimeout(() => {
                letterContainer.style.display = "none";
                letterContainer.classList.remove("folding");
                starrySky.style.display = "block";
                
                for (let i = 0; i < 100; i++) {
                    const star = document.createElement("div");
                    star.className = "star";
                    star.style.left = Math.random() * 100 + "vw";
                    star.style.top = Math.random() * 100 + "vh";
                    star.style.width = Math.random() * 3 + 1 + "px";
                    star.style.height = star.style.width;
                    star.style.animationDelay = Math.random() * 5 + "s";
                    starrySky.appendChild(star);
                }
                
                // Final animations...
                setTimeout(() => {
                    finalMessage.style.display = "block";
                    setTimeout(() => {
                        finalMessage.style.display = "none";
                        confirmationMessage.style.display = "block";
                        setTimeout(() => {
                            starrySky.style.display = "none";
                            confirmationMessage.style.display = "none";
                            // Show wish section again after everything is done
                            wishSection.style.display = 'block';
                        }, 4000);
                    }, 3000);
                }, 1000);

            }, 1000);
        });

        // --- Gallery Elements ---
        const gallerySection = document.getElementById("gallery");
        const loadingContainer = document.getElementById("loadingContainer");
        const fullscreenMemories =
          document.getElementById("fullscreenMemories");
        const closeGalleryBtn = document.getElementById("closeGalleryBtn");
        let imageInterval = null;
        let heartTrailInterval = null;

        const memories = [
          {
            img: "images/1.png",
          },
          {
            img: "images/2.png",
          },
          {
            img: "images/3.png",
          },
          {
            img: "images/5.png",
          },
          {
            img: "images/6.png",
          },
          {
            img: "images/7.png",
          },
          {
            img: "images/8.png",
          },
          {
            img: "images/9.png",
          },
          {
            img: "images/10.png",
          },
          {
            img: "images/11.png",
          },
          {
            img: "images/12.png",
          },
          {
            img: "images/13.png",
          },
          {
            img: "images/14.png",
          },
          {
            img: "images/15.png",
          },
          {
            img: "images/16.png",
          },
          {
            img: "images/17.png",
          },
          {
            img: "images/19.png",
          },
          {
            img: "images/20.png",
          },
          {
            img: "images/21.png",
          },
          {
            img: "images/22.png",
          },
          {
            img: "images/23.png",
          },
          {
            img: "images/24.png",
          },
          {
            img: "images/25.png",
          },
          {
            img: "images/26.png",
          },
          {
            img: "images/27.jpg",
          },
          {
            img: "images/28.png",
          },
          {
            img: "images/29.png",
          },
          {
            img: "images/30.png",
          },
          {
            img: "images/31.png",
          },
          {
            img: "images/32.png",
          },
          {
            img: "images/33.png",
          },
          {
            img: "images/34.png",
          },
          {
            img: "images/35.png",
          },
          {
            img: "images/36.png",
          },
          {
            img: "images/37.png",
          },
          {
            img: "images/38.png",
          },
          {
            img: "images/39.png",
          },
          {
            img: "images/40.png",
          },
          {
            img: "images/41.png",
          },
          {
            img: "images/42.png",
          },
          {
            img: "images/43.png",
          },
          {
            img: "images/44.png",
          },
          {
            img: "images/45.png",
          },
          {
            img: "images/46.png",
          },
          {
            img: "images/47.png",
          },
          {
            img: "images/48.png",
          },
          {
            img: "images/49.png",
          },
          {
            img: "images/50.png",
          },
          {
            img: "images/51.png",
          },
          {
            img: "images/52.png",
          },
          {
            img: "images/53.png",
          },
          {
            img: "images/54.png",
          },
          {
            img: "images/55.png",
          },
          {
            img: "images/56.png",
          },
          {
            img: "images/57.png",
          },
        ];

        // --- Password & Envelope Logic ---
        const initApp = () => {
          const passwordInput = document.getElementById("passwordInput");
          const submitBtn = document.getElementById("submitBtn");
          const envelope = document.getElementById("envelope");

          const checkPassword = () => {
            if (passwordInput.value.toLowerCase() === "dinhnhatngoc") {
              passwordScreen.style.opacity = "0";
              setTimeout(() => {
                passwordScreen.style.display = "none";
                envelopeContainer.style.display = "block";
                document
                  .getElementById("backgroundMusic")
                  .play()
                  .catch(() => {});
                document.getElementById("playBtn").innerHTML =
                  '<i class="fas fa-pause"></i>';
              }, 500);
            } else {
              passwordInput.style.borderColor = "red";
              setTimeout(() => {
                passwordInput.style.borderColor = "#ff6b6b";
              }, 1000);
            }
          };

          submitBtn.addEventListener("click", checkPassword);
          passwordInput.addEventListener(
            "keydown",
            (e) => e.key === "Enter" && checkPassword()
          );

          envelope.addEventListener("click", () => {
            envelope.classList.add("open");
            setTimeout(() => {
              envelopeContainer.style.display = "none";
              mainContent.style.display = "flex";
              document.getElementById("musicPlayer").classList.add("show");
            }, 1500);
          });
        };

        // --- UPDATED Gallery Logic with Heart Trail ---
        function createFloatingImage() {
          const img = document.createElement("img");
          img.className = "floating-memory";
          img.src = memories[Math.floor(Math.random() * memories.length)].img;

          const size = Math.random() * 150 + 100;
          img.style.width = `${size}px`;
          img.style.height = "auto";
          img.style.top = `${Math.random() * (window.innerHeight - size)}px`;

          const duration = Math.random() * 10 + 12; // Adjusted duration
          img.style.animationDuration = `${duration}s`;

          fullscreenMemories.appendChild(img);
          img.addEventListener("animationend", () => img.remove());
        }

        function createHeartTrail() {
          const activeImages = document.querySelectorAll(".floating-memory");
          activeImages.forEach((img) => {
            const rect = img.getBoundingClientRect();
            const heart = document.createElement("div");
            heart.className = "heart-trail";
            heart.innerHTML = "❤️";

            // Position heart at the center-left of the image
            heart.style.left = `${rect.left - 10}px`;
            heart.style.top = `${rect.top + rect.height / 2 - 10}px`;
            heart.style.fontSize = `${Math.random() * 10 + 10}px`;

            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1500);
          });
        }

        function startMemoriesAnimation() {
          if (imageInterval) clearInterval(imageInterval);
          if (heartTrailInterval) clearInterval(heartTrailInterval);
          fullscreenMemories.innerHTML = "";

          imageInterval = setInterval(createFloatingImage, 800);
          heartTrailInterval = setInterval(createHeartTrail, 150);
        }

        function stopMemoriesAnimation() {
          clearInterval(imageInterval);
          clearInterval(heartTrailInterval);
          fullscreenMemories.innerHTML = "";
        }

        // --- UPDATED openGallery FUNCTION ---
        function openGallery() {
          gallerySection.style.display = "flex";
          gallerySection.classList.add("fullscreen");
          loadingContainer.style.display = "flex";
          closeGalleryBtn.style.display = "none";
          fullscreenMemories.innerHTML = ""; // Clear previous memories

          // Get elements for the new animation
          const progressFill = document.getElementById("progressFill");
          const progressIndicator =
            document.getElementById("progressIndicator");
          const progressPercentage =
            document.getElementById("progressPercentage");

          // Reset styles
          progressFill.style.width = "0%";
          progressIndicator.style.left = "0%";
          progressPercentage.textContent = "0%";

          const animationDuration = 2500; // 2.5 seconds
          let startTime = null;

          function animateProgressBar(timestamp) {
            if (!startTime) startTime = timestamp;
            const elapsedTime = timestamp - startTime;
            let progress = (elapsedTime / animationDuration) * 100;
            progress = Math.min(progress, 100);

            progressFill.style.width = progress + "%";
            progressIndicator.style.left = progress + "%";
            progressPercentage.textContent = Math.floor(progress) + "%";

            // Update thumb text based on progress
            const thumbText =
              progressIndicator.querySelector(".progress-thumb");
            thumbText.innerHTML = `<i class="fas fa-heart"></i> ${Math.floor(
              progress
            )}%`;

            if (elapsedTime < animationDuration) {
              requestAnimationFrame(animateProgressBar);
            } else {
              // Animation finished
              setTimeout(() => {
                loadingContainer.style.display = "none";
                closeGalleryBtn.style.display = "flex";
                startMemoriesAnimation();
              }, 300); // Short delay before showing memories
            }
          }

          requestAnimationFrame(animateProgressBar);
        }

        function closeGallery() {
          gallerySection.classList.remove("fullscreen");
          gallerySection.style.display = "none";
          closeGalleryBtn.style.display = "none";
          stopMemoriesAnimation();

          const firstNavItem = document.querySelector(
            '.nav-item[data-section="quiz"]'
          );
          if (firstNavItem) firstNavItem.click();
        }

        closeGalleryBtn.addEventListener("click", closeGallery);

        // --- Navigation System ---
        navItems.forEach((item) => {
          item.addEventListener("click", () => {
            const sectionId = item.dataset.section;
            sections.forEach((s) => (s.style.display = "none"));

            // Stop animations if leaving gallery view
            if (!gallerySection.classList.contains("fullscreen")) {
              stopMemoriesAnimation();
            }

            if (sectionId === "gallery") {
              openGallery();
            } else {
              // If gallery was open, properly close it first
              if (gallerySection.classList.contains("fullscreen")) {
                closeGallery();
              }
              sections.forEach((s) => (s.style.display = "none"));
              const activeSection = document.getElementById(sectionId);
              if (activeSection) activeSection.style.display = "block";
            }

            navItems.forEach((nav) => nav.classList.remove("active"));
            item.classList.add("active");
          });
        });

        // --- Other Sections Logic ---
        const setupOtherSections = () => {
          // QUIZ
          const quizData = [
            {
              q: "Đồ uống yêu thích của a là gì á?",
              o: ["Trà sữa", "Nước suối", "Nước trái cây", "Nước có gas"],
              a: 1,
            },
            {
              q: "Style phong cách yêu thích của a là gì?",
              o: ["Sang trọng", "Cổ điển", "Đơn giản", "Boyy choáy phố"],
              a: 2,
            },
            {
              q: "Món ăn yêu thích của a là gì?",
              o: ["Bún bò", "Bánh cuốn", "Phở", "Cơm tấm"],
              a: 0,
            },
            {
              q: "Nếu đi du lịch thì a sẽ chọn đi đâu?",
              o: ["Biển", "Hang động", "Rừng", "Núi"],
              a: 0,
            },
            {
              q: "Môn thể thao mà a ưa thích?",
              o: ["Bóng rổ", "Cầu lông", "Bóng đá", "Bóng chuyền"],
              a: 3,
            },
          ];
          let currentQuiz = 0;
          const questionEl = document.getElementById("question");
          const optionsEl = document.getElementById("options");
          const quizResult = document.getElementById("quizResult");
          const nextBtn = document.getElementById("nextBtn");

          function loadQuiz() {
            const item = quizData[currentQuiz];
            questionEl.textContent = item.q;
            optionsEl.innerHTML = "";
            item.o.forEach((optionText, index) => {
              const btn = document.createElement("button");
              btn.className = "option-btn";
              btn.textContent = optionText;
              btn.onclick = () => selectAnswer(index);
              optionsEl.appendChild(btn);
            });
            quizResult.textContent = "";
            nextBtn.style.display = "none";
          }

          function selectAnswer(selectedIndex) {
            const correct = quizData[currentQuiz].a;
            document
              .querySelectorAll(".option-btn")
              .forEach((b) => (b.disabled = true));
            if (selectedIndex === correct) {
              quizResult.textContent = "Chính xác! Em thật tuyệt vời! ❤️";
            } else {
              quizResult.textContent = "Sai rồi, nhưng không sao cả!";
            }
            nextBtn.style.display = "block";
          }

          nextBtn.addEventListener("click", () => {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
              loadQuiz();
            } else {
              questionEl.textContent = "Quiz đã kết thúc!";
              optionsEl.innerHTML =
                "Điểm số không quan trọng, quan trọng là anh yêu em!";
              quizResult.innerHTML = "";
              nextBtn.style.display = "none";
            }
          });
          loadQuiz();

          // GIFT
          const giftBox = document.getElementById("giftBox");
          const giftMessage = document.getElementById("giftMessage");
          const typedText = document.getElementById("typedText");

          // nếu chưa có nút đóng trong HTML thì thêm động
          if (!giftMessage.querySelector(".close-gift")) {
            const btnClose = document.createElement("button");
            btnClose.className = "close-gift";
            btnClose.innerHTML = "&times;";
            giftMessage.appendChild(btnClose);

            btnClose.addEventListener("click", (e) => {
              e.stopPropagation();
              giftMessage.classList.remove("show");
              giftBox.classList.remove("opened");
              giftBox.classList.remove("blurred");
            });
          }

          const giftContent = `🎂✨Ngày này, cách đây tròn 18 năm… một cô gái bé nhỏ 👶 cất tiếng khóc đầu đời, mang đến cho cha mẹ 👨‍👩‍👧 một niềm hạnh phúc không gì có thể diễn tả 🥳. Anh có thể không chứng kiến khoảnh khắc ấy, nhưng anh biết... chắc chắn đó là một ngày rất tuyệt vời 🌸 – ngày mà thế giới này có thêm một người con gái vô cùng đặc biệt ✨.

Đã 18 năm trôi qua kể từ ngày e ra đời ⏳, em lớn lên từng ngày 🌱, trải qua bao kỷ niệm 📖, bao lần vấp ngã 💔 và cả những niềm vui ngọt ngào 🍬. Cho đến khi em có cho mình mối tình đầu 💌 – một dấu mốc của tuổi trẻ vừa mong manh 🌷 vừa rực rỡ 🌹. Và như một sự tình cờ đẹp đẽ 🍀, không lâu sau đó, chúng ta gặp nhau 💖. Mặc mới quen 3 tháng 🕒 – chưa đủ dài để hiểu hết về nhau, nhưng đủ để anh nhận ra… em chính là một sắc màu mới 🎨 mà anh chưa từng thấy, khiến anh muốn ở lại và trân trọng từng khoảnh khắc 💫.

🌸 Ngoài ra tuổi 18 chính là tấm vé 🎟️ đưa em bước lên chuyến tàu 🚂 của những ước mơ ✨ và những trải nghiệm mới mẻ 🗺️. Trên chuyến tàu ấy, sẽ có những ngày nắng rực 🔆, cũng có thể bất chợt xuất hiện những cơn mưa giông 🌧️. Nhưng anh tin rằng, với trái tim ấm áp ❤️ và tinh thần mạnh mẽ 💪, em sẽ luôn vượt qua tất cả 🌈. Anh mong mỗi sáng thức dậy 🌅, em sẽ luôn có một lý do để mỉm cười 😊, một ước mơ để theo đuổi 🌠, một niềm tin để bước tiếp 🚶‍♀️ và một khát vọng để không ngừng vươn lên 🚀.

Anh không biết hành trình phía trước của em sẽ dài bao nhiêu 📏, rộng bao nhiêu 🌍, nhưng anh chắc chắn mình sẽ là một phần nhỏ trong đó 🧩 – để cùng e bước tiếp - để khi em vui 😄 sẽ có người cùng sẻ chia 💌 - khi em buồn 😔 sẽ có một bờ vai chờ sẵn 🤍. Cảm ơn em đã để anh hiện diện 🌟 trong một chương mới 📖 của cuộc đời em.

💫 Và rồi, nếu một ngày nào đó 📅, khi em nhìn lại tuổi 18 🔞 – em có thể sẽ nhớ đến những buổi chiều ngập nắng 🌞, những giấc mơ đang lớn dần 🌱, và cả những người đã đi cùng em 👣 trên một đoạn đường. Anh chỉ mong rằng, khi nhắc đến khoảng thời gian này 🕰️, em sẽ mỉm cười 😊 và nhớ rằng đã từng có một người… lặng lẽ dõi theo 👀, trân trọng 🤲, và cầu chúc cho em mọi điều tốt đẹp nhất 🌹. Người đó… chính là anh 💖.`;

          // Option: hiệu ứng đánh máy (bật/tắt bằng biến)
          const useTypingEffect = true;
          function showGift() {
            giftBox.classList.add("opened");
            giftBox.classList.add("blurred"); // nếu bạn muốn làm mờ hộp
            giftMessage.classList.add("show");

            if (!useTypingEffect) {
              typedText.textContent = giftContent;
              return;
            }

            // typing effect
            typedText.textContent = "";
            let i = 0;
            const speed = 18; // ms/ky tu -> tăng giảm để chậm/nhanh
            const t = setInterval(() => {
              typedText.textContent += giftContent.charAt(i);
              i++;
              // keep scroll to bottom as text grows (so user sees new text)
              giftMessage.scrollTop = giftMessage.scrollHeight;
              if (i >= giftContent.length) clearInterval(t);
            }, speed);
          }

          giftBox.addEventListener("click", (e) => {
            // tránh mở nhiều lần
            if (giftMessage.classList.contains("show")) return;
            showGift();
          });

          // CAKE
          document.getElementById("blowBtn").addEventListener("click", () => {
            document.getElementById("blowSound").play();
            document.querySelectorAll(".flame").forEach((f) => {
              f.classList.add("extinguished");
            });
            document.getElementById("wishText").style.display = "block";
          });

          // GAME ĐOÁN SỐ
          const guessInput = document.getElementById("guessInput");
          const guessBtn = document.getElementById("guessBtn");
          const gameFeedback = document.getElementById("gameFeedback");
          const guessCountEl = document.getElementById("guessCount");
          const remainingGuessesEl =
            document.getElementById("remainingGuesses");
          const resetBtn = document.getElementById("resetBtn");

          let targetNumber;
          let guessCount;
          let remainingGuesses;

          function initGame() {
            targetNumber = Math.floor(Math.random() * 100) + 1;
            guessCount = 0;
            remainingGuesses = 10;
            guessCountEl.textContent = guessCount;
            remainingGuessesEl.textContent = remainingGuesses;
            gameFeedback.textContent = "Hãy nhập số và đoán lần đầu tiên!";
            gameFeedback.style.color = "#ff6b6b";
            guessInput.value = "";
            guessInput.disabled = false;
            guessBtn.disabled = false;
            resetBtn.disabled = false;
          }

          initGame(); // Khởi tạo game lần đầu

          guessBtn.addEventListener("click", () => {
            const userGuess = parseInt(guessInput.value);

            if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
              gameFeedback.textContent = "Vui lòng nhập số từ 1 đến 100!";
              gameFeedback.style.color = "red";
              return;
            }

            guessCount++;
            remainingGuesses--;
            guessCountEl.textContent = guessCount;
            remainingGuessesEl.textContent = remainingGuesses;

            if (userGuess === targetNumber) {
              gameFeedback.innerHTML = `🎉 Chính xác! Bạn đã đoán đúng số ${targetNumber} sau ${guessCount} lần đoán!`;
              gameFeedback.style.color = "#28a745";
              endGame();
            } else if (remainingGuesses <= 0) {
              gameFeedback.innerHTML = `😢 Rất tiếc! Bạn đã hết lượt. Số cần tìm là ${targetNumber}.`;
              gameFeedback.style.color = "red";
              endGame();
            } else {
              gameFeedback.textContent =
                userGuess > targetNumber
                  ? `Số ${userGuess} lớn hơn số cần tìm!`
                  : `Số ${userGuess} nhỏ hơn số cần tìm!`;
              gameFeedback.style.color = "#ff6b6b";
            }

            guessInput.value = "";
            guessInput.focus();
          });

          function endGame() {
            guessInput.disabled = true;
            guessBtn.disabled = true;
          }

          resetBtn.addEventListener("click", initGame);
        };

        // --- Initialization ---
        initApp();
        setupOtherSections();
      });