# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email: jasonbmt06@gmail.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Response Timeline

- **Acknowledgment**: Within 48 hours
- **Initial assessment**: Within 1 week
- **Fix release**: Within 2 weeks for critical issues

## Security Measures

This project implements:

- Input validation with Zod schemas
- SQL injection prevention via Prisma ORM
- XSS protection headers
- CSRF protection
- Rate limiting on sensitive endpoints
- Admin authentication (Basic/Bearer)
- Security headers (HSTS, X-Frame-Options, CSP)
- No secrets in source code
- Environment-based configuration

## Disclosure Policy

We follow responsible disclosure. After a fix is released, we will:
1. Credit the reporter (unless they prefer anonymity)
2. Publish a security advisory on GitHub
3. Update the CHANGELOG
