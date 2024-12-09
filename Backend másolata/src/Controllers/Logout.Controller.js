export default {
    LogoutPostController: (req, res) => {
        if (!req.session) {
            return res.status(400).json({
                error: true,
                message: "Nem található aktív session!",
            });
        }

        req.session.destroy(err => {
            if (err) {
                console.error("Kijelentkezés hiba:", err);
                return res.status(500).json({
                    error: true,
                    message: "Hiba jelentkezett a kijelentkezés során!",
                });
            }

            res.status(200).json({
                success: true,
                message: "Sikeres kijelentkezés!",
            });
        });
    },
};
