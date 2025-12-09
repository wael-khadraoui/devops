// tests/validation.test.js
describe('Input Validation Tests', () => {

  test('Email validation should reject invalid formats', () => {
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    expect(isValidEmail('valid@example.com')).toBe(true);
    expect(isValidEmail('invalid.email')).toBe(false);
    expect(isValidEmail('user@')).toBe(false);
    expect(isValidEmail('@example.com')).toBe(false);
  });

  test('Password strength validation should work', () => {
    const isStrongPassword = (password) => {
      return password.length >= 8;
    };

    expect(isStrongPassword('short')).toBe(false);
    expect(isStrongPassword('ValidPass123')).toBe(true);
  });

  test('Username validation should enforce rules', () => {
    const isValidUsername = (username) => {
      return username.length >= 3 && username.length <= 20;
    };

    expect(isValidUsername('ab')).toBe(false);
    expect(isValidUsername('validuser')).toBe(true);
    expect(isValidUsername('a'.repeat(25))).toBe(false);
  });

  test('Required field validation should work', () => {
    const validateRequired = (obj, fields) => {
      return fields.every(field => obj[field] !== undefined && obj[field] !== '');
    };

    const validUser = { username: 'user', email: 'user@example.com' };
    const invalidUser = { username: '', email: 'user@example.com' };

    expect(validateRequired(validUser, ['username', 'email'])).toBe(true);
    expect(validateRequired(invalidUser, ['username', 'email'])).toBe(false);
  });

  test('Data type validation should enforce types', () => {
    const validateTypes = (data, schema) => {
      return Object.keys(schema).every(key => 
        typeof data[key] === schema[key]
      );
    };

    const validData = { userId: 1, name: 'John' };
    const schema = { userId: 'number', name: 'string' };

    expect(validateTypes(validData, schema)).toBe(true);
  });

  test('Number validation should check ranges', () => {
    const isValidNumber = (value, min, max) => {
      return typeof value === 'number' && value >= min && value <= max;
    };

    expect(isValidNumber(5, 1, 10)).toBe(true);
    expect(isValidNumber(15, 1, 10)).toBe(false);
    expect(isValidNumber(-5, 1, 10)).toBe(false);
  });

  test('Array validation should check contents', () => {
    const isValidArray = (arr) => {
      return Array.isArray(arr) && arr.length > 0;
    };

    expect(isValidArray([1, 2, 3])).toBe(true);
    expect(isValidArray([])).toBe(false);
    expect(isValidArray('not an array')).toBe(false);
  });

  test('SQL injection prevention should sanitize input', () => {
    const sanitizeInput = (input) => {
      return input.replace(/[;'"\\]/g, '');
    };

    const maliciousInput = "'; DROP TABLE users; --";
    const sanitized = sanitizeInput(maliciousInput);

    expect(sanitized).not.toContain(';');
    expect(sanitized).not.toContain("'");
  });

  test('XSS prevention should escape HTML', () => {
    const escapeHtml = (text) => {
      const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      };
      return text.replace(/[&<>"']/g, m => map[m]);
    };

    const xssAttempt = '<script>alert("XSS")</script>';
    const escaped = escapeHtml(xssAttempt);

    expect(escaped).not.toContain('<script>');
    expect(escaped).toContain('&lt;');
  });

  test('Date validation should work correctly', () => {
    const isValidDate = (dateString) => {
      const date = new Date(dateString);
      return date instanceof Date && !isNaN(date);
    };

    expect(isValidDate('2025-01-01')).toBe(true);
    expect(isValidDate('invalid-date')).toBe(false);
  });
});
