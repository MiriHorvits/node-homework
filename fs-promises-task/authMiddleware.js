const checkAuth = (req, res, next) => {
    console.log(`קריאה נכנסה לנתיב: ${req.url}`); // הדפסה ל-console בכל קריאה

    const authKey = req.headers['auth-key'];

    if (authKey === 'הערך_הסודי_שבחרת') { 
        next(); // תקין - ממשיכים הלאה
    } else {
        res.status(401).json({ message: "Unauthorized" }); // לא תקין - מחזירים 401
    }
};

module.exports = checkAuth;