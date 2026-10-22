/* Shared auth store for MyBlog (mock, localStorage based) */
(function () {
  var USERS_KEY = "myblog_users";
  var SESSION_KEY = "myblog_session";
  var THEME_KEY = "myblog_theme";

  function read(key, fallback) {
    try {
      var raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  function write(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      return false;
    }
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || "").trim());
  }

  function hash(pw) {
    // Simple demo hash - not real security, mock only.
    var h = 0;
    var s = "myblog::" + pw;
    for (var i = 0; i < s.length; i++) {
      h = (h << 5) - h + s.charCodeAt(i);
      h |= 0;
    }
    return "h" + Math.abs(h);
  }

  var AuthStore = {
    USERS_KEY: USERS_KEY,
    SESSION_KEY: SESSION_KEY,
    THEME_KEY: THEME_KEY,

    isValidEmail: isValidEmail,

    getUsers: function () {
      return read(USERS_KEY, []);
    },

    getUserByEmail: function (email) {
      var needle = String(email || "").trim().toLowerCase();
      var users = this.getUsers();
      for (var i = 0; i < users.length; i++) {
        if (users[i].email.toLowerCase() === needle) return users[i];
      }
      return null;
    },

    signup: function (data) {
      var name = String(data.name || "").trim();
      var email = String(data.email || "").trim();
      var password = String(data.password || "");

      if (name.length < 2) return { ok: false, error: "Enter your name (at least 2 characters)." };
      if (!isValidEmail(email)) return { ok: false, error: "Enter a valid email address." };
      if (password.length < 6) return { ok: false, error: "Password must be at least 6 characters." };
      if (this.getUserByEmail(email)) return { ok: false, error: "An account with this email already exists." };

      var users = this.getUsers();
      var user = {
        id: "u" + Date.now(),
        name: name,
        email: email.toLowerCase(),
        password: hash(password),
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      write(USERS_KEY, users);
      write(SESSION_KEY, { userId: user.id, email: user.email, name: user.name, loginAt: new Date().toISOString() });
      return { ok: true, user: user };
    },

    login: function (data) {
      var email = String(data.email || "").trim();
      var password = String(data.password || "");

      if (!isValidEmail(email)) return { ok: false, error: "Enter a valid email address." };
      if (!password) return { ok: false, error: "Enter your password." };

      var user = this.getUserByEmail(email);
      if (!user || user.password !== hash(password)) {
        return { ok: false, error: "Invalid email or password." };
      }
      write(SESSION_KEY, { userId: user.id, email: user.email, name: user.name, loginAt: new Date().toISOString() });
      return { ok: true, user: user };
    },

    logout: function () {
      try { localStorage.removeItem(SESSION_KEY); } catch (e) {}
      return true;
    },

    getSession: function () {
      return read(SESSION_KEY, null);
    },

    isLoggedIn: function () {
      return !!this.getSession();
    },

    getTheme: function () {
      return read(THEME_KEY, "light");
    },

    setTheme: function (theme) {
      write(THEME_KEY, theme);
      return theme;
    },
  };

  window.AuthStore = AuthStore;
})();
