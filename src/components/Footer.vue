<!-- Footer.vue -->
<template>
    <footer class="footer">
        <div class="footer-up">
            <div class="footer-info">
                <h4>EasyMiles</h4>
                <p>Our vision is to provide convenience and help increase your sales business.</p>
            </div>
            <div class="footer-links">
                <div class="links-section">
                    <h5>About</h5>
                    <ul>
                        <li>How it works</li>
                        <li>Featured</li>
                        <li>Partnership</li>
                        <li>Business Relation</li>
                    </ul>
                </div>
                <div class="links-section">
                    <h5>Community</h5>
                    <ul>
                        <li>Events</li>
                        <li>Blog</li>
                        <li>Podcast</li>
                        <li>Invite a friend</li>
                    </ul>
                </div>
                <div class="links-section">
                    <h5>Socials</h5>
                    <ul>
                        <li>Discord</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>Facebook</li>
                    </ul>
                </div>
            </div>
        </div>
        <p class="footer-legal">©2024 EasyMiles. All rights reserved | Privacy & Policy | Terms & Condition</p>
    </footer>
</template>

<script>
export default {};
</script>

<style scoped>
.footer {
    padding: 30px 100px;
    background-color: #1c1c1c;
    color: #e0e0e0;
    font-size: 14px;
}

.footer-up {
    display: flex;
    justify-content: space-between;
}

.footer-info h4 {
    font-size: 18px;
    margin-bottom: 10px;
}

.footer-links {
    display: flex;
    gap: 50px;
}

.links-section h5 {
    font-size: 16px;
    margin-bottom: 10px;
}

.footer-legal {
    text-align: center;
    margin-top: 20px;
    color: #666;
}
</style>
