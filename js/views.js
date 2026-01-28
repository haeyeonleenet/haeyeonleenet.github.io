export const homeView = () => `
    <section class="hero-section fade-in" style="background-image: url('assets/images/EYR01028.JPG');">
        <div class="hero-content">
            <h1>Haeyeon Lee</h1>
            <p class="subtitle">SOPRANO</p>
        </div>
    </section>
`;

export const aboutView = () => `
    <section class="content-section fade-in">
        <h2>About</h2>
        
        <!-- TABS HEADER -->
        <div class="media-tabs" style="margin-bottom: 2rem;">
            <button class="tab-btn active" data-tab="tab-bio">Bio</button>
            <button class="tab-btn" data-tab="tab-cv">CV</button>
        </div>

        <!-- BIO TAB (With Split Layout & Photo) -->
        <div id="tab-bio" class="tab-pane active">
            <div class="split-layout">
                <div class="text-column">
                    <div class="bio-content">
                        <p>Soprano Haeyeon Lee is a distinguished vocalist recognized for her elegant artistry and compelling stage presence. She currently serves as the Principal of the Bucheon City Choir, a position she has held since 2019, where she continues to contribute to the ensemble’s professional excellence.</p>
<p>Ms. Lee’s operatic repertoire includes notable roles such as Constance in Dialogues des Carmélites and Lauretta in Gianni Schicchi at the Wilhelma Theater and HMDK Stuttgart in Germany. She also performed the role of Susanna in Le Nozze di Figaro at the Kim Young-Eui Hall at Ewha Womans University.</p>
<p>As a concert soloist, Ms. Lee has performed in major venues across Korea. Her recent engagements include performing as the soloist for Händel’s Dixit Dominus (2025) and Mendelssohn’s St. Paul (2024) at the Aram Music Hall, Goyang Aram Nuri Arts Center. She also held a Return Recital at the Youngsan Art Hall in 2025 and a Lied Duo Concert at Samik Art Hall in 2021.</p>
<p>Ms. Lee holds a Master of Arts (M.A.) in Opera from the Staatliche Hochschule für Musik und Darstellende Kunst Stuttgart (HMDK) in Germany, and a Certificate of Advanced Studies (C.A.S.) in Vocal Performance. She earned her Bachelor of Arts in Vocal Performance from Ewha Womans University in Seoul. Her artistic development was further enriched by a scholarship from the Bach-Archiv Leipzig and masterclasses with renowned artists such as Hye Kyung Hong, Olaf Bär, and Inge Borkh.</p>
                    </div>
                </div>
                <!-- Photo lives INSIDE the bio tab -->
                <div class="image-column">
                    <img src="assets/images/EYR00610.JPG" alt="Haeyeon Lee Portrait" class="about-image">
                </div>
            </div>
        </div>

        <!-- CV TAB (Full Width, No Photo) -->
        <div id="tab-cv" class="tab-pane" style="display:none;">
            <div class="cv-container" style="max-width: 800px; margin: 0 auto;">
                
        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Selected Performances</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Soloist, Händel dixit dominus<br>Aram Music Hall, Goyang Aram Nuri Arts Center, Korea | 2025</li>
<li>Return Recital<br>Youngsan Art Hall, Seoul, Korea | 2025</li>
<li>Soloist, Mendelssohn St. Paul (Paulus)<br>Aram Music Hall, Goyang Aram Nuri Arts Center, Korea | 2024</li>
<li>Lied Duo Concert<br>Samik Art Hall, Seoul, Korea | 2021</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Opera & Stage Performances</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Constance – Dialogues des Carmélites<br>HMDK Stuttgart, Stuttgart, Germany | Dec 2017</li>
<li>Lauretta – Gianni Schicchi<br>Wilhelma Theater, Stuttgart, Germany | Jan 2017</li>
<li>Susanna – Le Nozze di Figaro<br>Kim Young-Eui Hall, Ewha Womans University, Seoul, Korea | May 2014</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Professional Experience</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Soprano Section Member (Principal)<br>Bucheon City Choir (Professional Ensemble), Korea |  2019 – Present</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Education</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Certificate of Advanced Studies (C.A.S.), Vocal Performance<br>Staatliche Hochschule für Musik und Darstellende Kunst Stuttgart (HMDK), Germany<br>2018 – 2019</li>
<li>Master of Arts (M.A.), Opera<br>Staatliche Hochschule für Musik und Darstellende Kunst Stuttgart (HMDK), Germany<br>2016 – 2018</li>
<li>Bachelor of Arts (B.A.), Vocal Performance<br>Ewha Womans University, Seoul, Korea<br>2011 – 2015</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Scholarship</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Bach-Archiv Leipzig, Germany | 2015</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Masterclasses</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Hei-Kyung Hong, Soprano<br>Seoul, Korea | 2024</li>
<li>Olaf Bär, Baritone<br>Kirchheim an der Weinstraße, Germany | 2018</li>
<li>Inge Borkh, Soprano<br>Stuttgart, Germany | 2018</li>
<li>Margreet Honig, Soprano<br>Stuttgart, Germany | 2016</li>
<li>Ingeborg Danz, Alto<br>Seoul, Korea | 2014</li>
            </ul>
        </div>
    

        <div class="cv-section">
            <h3 style="margin-top: 2rem; margin-bottom: 1rem; border-bottom: 1px solid #eee; padding-bottom: 0.5rem;">Contacts</h3>
            <ul style="margin-bottom: 2rem; line-height: 1.6;">
                <li>Email: sop.haeyeon.lee@gmail.com<br>Phone: +82-10-3697-1398<br>Seoul, Republic of Korea</li>
            </ul>
        </div>
    
            </div>
        </div>

    </section>
`;

export const mediaView = () => `
    <section class="content-section fade-in">
        <h2>Media</h2>
        <div class="media-tabs">
            <button class="tab-btn active" data-tab="photos">Photos</button>
            <button class="tab-btn" data-tab="video">Video</button>
        </div>
        <div class="media-content">
            <div id="photos" class="tab-pane active">
                <div class="media-grid">
                    <img src="assets/images/EYR00610.JPG" alt="Gallery Image" loading="lazy">
                    <img src="assets/images/EYR00658.JPG" alt="Gallery Image" loading="lazy">
                    <img src="assets/images/EYR00821.JPG" alt="Gallery Image" loading="lazy">
                    <img src="assets/images/EYR01028.JPG" alt="Gallery Image" loading="lazy">
                </div>
            </div>
            <div id="video" class="tab-pane" style="display:none;">
                <div class="video-grid">
                    
                    <div class="video-card">
                        <div class="video-wrapper">
                            <iframe width="200" height="113" src="https://www.youtube.com/embed/6u0H9qrfP0A?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="&quot;Es lebt eine Vilja&quot;- Léhar: Die lustige Witwe, Act II  소프라노 이해연"></iframe>
                        </div>
                        <div class="video-info">
                            <h3>"Es lebt eine Vilja"- Léhar: Die lustige Witwe, Act II  소프라노 이해연</h3>
                            <p class="date">2026-01-01</p>
                            <p class="desc">Live performance from the Winter Gala.</p>
                        </div>
                    </div>
    

                    <div class="video-card">
                        <div class="video-wrapper">
                            <iframe width="200" height="113" src="https://www.youtube.com/embed/tzsZYtSoGvE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="La Damoiselle élue - Claude Debussy - 소프라노 이해연"></iframe>
                        </div>
                        <div class="video-info">
                            <h3>La Damoiselle élue - Claude Debussy - 소프라노 이해연</h3>
                            <p class="date">2026-02-15</p>
                            <p class="desc">Conducted by Maestro Kim at Arts Center.</p>
                        </div>
                    </div>
    

                    <div class="video-card">
                        <div class="video-wrapper">
                            <iframe width="200" height="113" src="https://www.youtube.com/embed/jAWat1u27hI?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="[소프라노 이해연] 마중 - 윤학준"></iframe>
                        </div>
                        <div class="video-info">
                            <h3>[소프라노 이해연] 마중 - 윤학준</h3>
                            <p class="date">2025-03-28</p>
                            <p class="desc">Return Recital</p>
                        </div>
                    </div>
    

                    <div class="video-card">
                        <div class="video-wrapper">
                            <iframe width="200" height="113" src="https://www.youtube.com/embed/aBPVagm-MwE?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen title="F. Schubert - An die Nachtigall, D. 497"></iframe>
                        </div>
                        <div class="video-info">
                            <h3>F. Schubert - An die Nachtigall, D. 497</h3>
                            <p class="date">2025-10-01</p>
                            <p class="desc">서리풀청년예술단 [서초M.스타즈] 5기</p>
                        </div>
                    </div>
    
                </div>
            </div>
        </div>
    </section>
`;

export const scheduleView = () => `
    <section class="content-section fade-in">
        <h2>Schedule</h2>
        <ul class="schedule-list">
            
            <li class="schedule-item">
                <span class="date">OCT 2026</span>
                <span class="event">Recital at Arts Center</span>
                <span class="location">Seoul, Korea</span>
            </li>

            <li class="schedule-item">
                <span class="date">DEC 2026</span>
                <span class="event">Winter Gala Concert</span>
                <span class="location">New York, USA</span>
            </li>

            <li class="schedule-item">
                <span class="date">JAN 2027</span>
                <span class="event">Opera Debut: "La Bohème"</span>
                <span class="location">London, UK</span>
            </li>
        </ul>
    </section>
`;

export const contactView = () => `
    <section class="content-section fade-in">
        <h2>Contact</h2>
        <div class="contact-info">
            <p>Email: <a href="mailto:info@haeyeonlee.com">info@haeyeonlee.com</a></p>
        </div>
    </section>
`;
