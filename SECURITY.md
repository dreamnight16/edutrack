# Security Policy

## Supported Versions

| Version | Supported          |
|---------|--------------------|
| 0.1.x   | :white_check_mark: |
| < 0.1   | :x:                |

## Reporting a Vulnerability

Please report security vulnerabilities to **[support@dreamnight.net.cn]**.

**Do NOT** create public GitHub issues for security vulnerabilities.

You should receive a response within 48 hours. If the issue is confirmed,
we will release a patch as soon as possible, depending on complexity.

## Preferred Languages

- English
- 中文 (Chinese)

## Disclosure Policy

Once a fix is ready, we will:

1. Release a patch version
2. Publish a security advisory on GitHub
3. Credit the reporter (unless anonymity is requested)

## Security Considerations

### Data Handling

- User queries and content are handled client-side; avoid persisting sensitive data
- API keys and secrets live in environment variables, never in source code

### Dependencies

- Dependencies are managed via `package-lock.json`; review updates before upgrading
- Run `npm audit` to check for known vulnerabilities in the dependency tree

### Input Validation

- Validate all user input at the boundary before processing
- Sanitize any user-provided HTML to prevent XSS
- Never trust external data (API responses, user input, file content)

### Reporting

Report any security issue through the contact above rather than public issues.
