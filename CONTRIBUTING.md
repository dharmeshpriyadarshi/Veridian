# Contributing to Veridian

Thank you for your interest in contributing to Veridian! This document provides guidelines and instructions for contributing.

## 🌟 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce** the behavior
- **Expected behavior**
- **Screenshots** if applicable
- **Environment details** (OS, Node version, Python version, etc.)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, include:

- **Clear title and description**
- **Current behavior** vs **suggested behavior**
- **Why this enhancement would be useful**
- **Possible implementation** if you have ideas

### Pull Requests

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
6. Push to the branch (`git push origin feature/AmazingFeature`)
7. Open a Pull Request

## 📝 Development Guidelines

### Code Style

#### Frontend (TypeScript/React)
- Use TypeScript strict mode
- Follow React best practices
- Use functional components with hooks
- Keep components small and focused
- Use Tailwind CSS for styling
- Follow the existing file structure

```typescript
// Good
export function PollutionCard({ data }: { data: PollutionData }) {
  const { aqi, location } = data
  
  return (
    <div className="rounded-lg border p-4">
      <h3 className="text-lg font-semibold">{location}</h3>
      <p className="text-muted-foreground">AQI: {aqi}</p>
    </div>
  )
}
```

#### Backend (Python/FastAPI)
- Follow PEP 8 style guide
- Use type hints
- Write docstrings for functions
- Keep functions focused and small
- Use Pydantic models for validation

```python
# Good
from typing import Optional
from pydantic import BaseModel

class PollutionQuery(BaseModel):
    """Query parameters for pollution data."""
    location: str
    latitude: Optional[float] = None
    longitude: Optional[float] = None

@router.get("/pollution")
async def get_pollution(query: PollutionQuery):
    """
    Get pollution data for a specific location.
    
    Args:
        query: Pollution query parameters
        
    Returns:
        PollutionData object with current pollution levels
    """
    # Implementation
    pass
```

### Commit Messages

Use clear and meaningful commit messages:

```
feat: Add bio-urban tree visualization on map
fix: Correct AQI calculation formula
docs: Update API documentation for prediction endpoints
style: Format code with Prettier
refactor: Simplify pollution calculation logic
test: Add tests for simulation endpoint
chore: Update dependencies
```

### Testing

#### Frontend Tests
```bash
cd frontend
npm run test
```

#### Backend Tests
```bash
cd backend
pytest
```

Always add tests for new features:

```typescript
// Frontend test example
describe('PollutionCard', () => {
  it('displays AQI correctly', () => {
    const data = { aqi: 150, location: 'Test City' }
    render(<PollutionCard data={data} />)
    expect(screen.getByText('AQI: 150')).toBeInTheDocument()
  })
})
```

```python
# Backend test example
def test_calculate_aqi():
    """Test AQI calculation."""
    pm25 = 35.0
    aqi = calculate_aqi(pm25)
    assert 51 <= aqi <= 100  # Moderate range
```

### Documentation

- Update README.md if needed
- Add JSDoc/docstrings for new functions
- Update API documentation for new endpoints
- Include code examples where helpful

## 🗂️ Project Structure

Understanding the project structure:

```
veridian/
├── frontend/
│   ├── app/              # Next.js pages (App Router)
│   │   ├── (auth)/      # Auth-related pages
│   │   ├── (dashboard)/ # Protected pages
│   │   └── api/         # API routes
│   ├── components/       # React components
│   │   ├── ui/          # Base UI components
│   │   ├── home/        # Home page components
│   │   ├── map/         # Map components
│   │   └── charts/      # Chart components
│   ├── lib/             # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── types/           # TypeScript types
│
└── backend/
    ├── app/
    │   ├── api/         # API routes
    │   │   └── routes/  # Endpoint definitions
    │   ├── core/        # Config and security
    │   ├── models/      # ML models
    │   ├── services/    # Business logic
    │   └── schemas/     # Pydantic schemas
    └── tests/           # Backend tests
```

## 🔍 Code Review Process

1. **Automated Checks**: Ensure CI passes
2. **Code Quality**: Follow style guidelines
3. **Tests**: Include relevant tests
4. **Documentation**: Update docs if needed
5. **Review**: Wait for maintainer review
6. **Revisions**: Address feedback promptly

## 🐛 Debugging Tips

### Frontend Debugging
```typescript
// Use console.log strategically
console.log('Pollution data:', data)

// Use React DevTools
// Check component props and state

// Check Network tab
// Verify API calls and responses
```

### Backend Debugging
```python
# Use logging
import logging
logger = logging.getLogger(__name__)
logger.debug(f"Pollution data: {data}")

# Use FastAPI debug mode
# Check logs in terminal

# Use Pydantic validation errors
# They provide detailed error messages
```

## 📦 Adding Dependencies

### Frontend
```bash
# Add regular dependency
npm install package-name

# Add dev dependency
npm install -D package-name

# Update package.json
# Document why the package is needed
```

### Backend
```bash
# Add to requirements.txt
echo "package-name==version" >> requirements.txt

# Install
pip install -r requirements.txt

# Document why the package is needed
```

## 🔒 Security

- **Never commit secrets** (.env files, API keys)
- **Validate all inputs** (use Pydantic/Zod)
- **Sanitize user data** before database operations
- **Use parameterized queries** to prevent SQL injection
- **Keep dependencies updated** for security patches

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

## 💬 Questions?

Feel free to:
- Open a Discussion on GitHub
- Comment on relevant Issues
- Reach out to [@dharmeshpriyadarshi](https://github.com/dharmeshpriyadarshi)

## 🙏 Thank You!

Your contributions make Veridian better for everyone. We appreciate your time and effort!

---

**Happy Coding! 🌱**
