// =============================================
// SAMPLE FILE - Intentional issues for SonarQube demo
// =============================================

// BUG 1: Division by zero check nahi hai
export function divide(a, b) {
  return a / b;  // Agar b=0 ho toh Infinity aayega
}

// CODE SMELL 2: Unused variable
export function add(a, b) {
  let unusedResult = 999;  // Yeh variable kabhi use nahi hoga
  return a + b;
}

// SECURITY ISSUE 3: Hardcoded password (vulnerability)
const DB_PASSWORD = "admin@1234";  // Kabhi hardcode mat karo!

// CODE SMELL 4: Empty catch block
export function riskyOperation() {
  try {
    JSON.parse("invalid json {{");
  } catch (e) {
    // Error silently ignore kar raha hai - bad practice!
  }
}

// BUG 5: == ki jagah === use karna chahiye
export function isEqual(a, b) {
  if (a == b) {  // SonarQube: use === instead
    return true;
  }
  return false;
}

// DUPLICATE CODE 6
export function greetUser(name) {
  console.log("Hello " + name);  // console.log production mein nahi hona chahiye
  return "Hello " + name;
}

export function greetAdmin(name) {
  console.log("Hello " + name);  // Same duplicate code
  return "Hello " + name;
}
```

---

### STEP 5 — SonarQube mein Token banao

SonarQube dashboard (`http://localhost:9000`) kholein:
```
1. Login karo  →  admin / admin  (ya apna password)

2. Top-right corner mein apna naam click karo
   → "My Account" click karo

3. "Security" tab pe jao

4. "Generate Tokens" section mein:
   - Name: my-vite-token
   - Type: User Token
   - Expiry: No expiration (ya 30 days)
   → "Generate" click karo

5. Token copy karo! (sirf ek baar dikhega)
   Example: squ_abc123def456ghi789...
