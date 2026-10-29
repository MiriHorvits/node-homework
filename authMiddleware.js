router.get('/:id', (req, res) => {
    const enrollmentId = req.params.id;
    const enrollment = getEnrollmentById(enrollmentId); // שליפת ההרשמה מה-Service שלך

    // הבדיקה המשוכפלת:
    if (!enrollment) {
        return res.status(404).json({ message: "Enrollment not found" });
    }

    return res.status(200).json(enrollment);
});