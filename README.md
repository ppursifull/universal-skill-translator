# Universal Skill Translator

A web application that converts your rank, ELO, tier, or handicap from one competitive system into equivalent skill levels across different games and sports.

## 🎯 Overview

Universal Skill Translator uses percentile-based mapping to translate your skill level from one competitive system to others. For example, your Diamond 3 rank in League of Legends might translate to Immortal 1 in Valorant, 1900 ELO in Chess, or a 2 handicap in Golf.

## ✨ Features

- **Cross-System Translation**: Convert between League of Legends, Valorant, Chess ELO, and Golf Handicap
- **Percentile-Based Algorithm**: Uses cumulative distribution functions for accurate skill mapping
- **Interactive UI**: Clean, responsive interface with real-time results
- **Deep Linking**: Share your results with shareable URLs
- **Mobile-First Design**: Optimized for all device sizes
- **Type Safety**: Built with TypeScript for reliability

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd universal-skill-translator
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
universal-skill-translator/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── about/             # About page
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── LadderSelect.tsx  # Ladder selection component
│   │   ├── TierAutocomplete.tsx # Tier autocomplete
│   │   └── ResultCard.tsx    # Results display
│   ├── lib/                  # Utility functions
│   │   ├── types.ts          # TypeScript type definitions
│   │   ├── math.ts           # Mathematical utilities
│   │   ├── data.ts           # Data loading utilities
│   │   └── utils.ts          # General utilities
│   └── test/                 # Test files
├── data/                     # Ladder data
│   ├── ladders/             # JSON ladder definitions
│   └── test/                # Test fixtures
├── public/                  # Static assets
└── package.json
```

## 📊 Data Format

### Tiered Ladders (e.g., League of Legends)

```json
{
  "id": "league_of_legends",
  "displayName": "League of Legends",
  "type": "tiered",
  "unitsLabel": "Tier",
  "bins": [
    { "label": "Iron IV", "p_min": 0.000, "p_max": 0.005 },
    { "label": "Diamond 3", "p_min": 0.965, "p_max": 0.970 }
  ]
}
```

### Continuous Ladders (e.g., Chess ELO)

```json
{
  "id": "chess_elo",
  "displayName": "Chess (ELO)",
  "type": "continuous",
  "unitsLabel": "ELO",
  "points": [
    { "value": 800, "p": 0.15 },
    { "value": 1600, "p": 0.82 }
  ]
}
```

## 🔧 API Endpoints

### GET /api/ladders
Returns list of all available ladders.

### GET /api/ladders/[id]
Returns specific ladder definition.

### POST /api/translate
Translates skill levels between systems.

**Request:**
```json
{
  "source": {
    "ladderId": "league_of_legends",
    "value": "Diamond 3"
  },
  "targets": ["valorant", "chess_elo", "golf_handicap"]
}
```

**Response:**
```json
{
  "sourcePercentile": 0.97,
  "equivalents": [
    {
      "ladderId": "valorant",
      "value": "Immortal 1",
      "confidence": "interpolated"
    }
  ]
}
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:ui
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Manual Deployment

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 🔮 Future Enhancements

- [ ] Add more competitive systems (Overwatch, Rocket League, Tennis)
- [ ] Regional variations for global games
- [ ] Historical data tracking
- [ ] Confidence intervals for translations
- [ ] Community-driven data collection
- [ ] Seasonal adjustments for rank inflation/deflation
- [ ] User presets and favorites
- [ ] CSV importer for custom distributions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⚠️ Disclaimer

The current distributions are placeholder estimates for demonstration purposes. We plan to replace these with authoritative data from official sources, community statistics, and comprehensive player surveys.

Skill translation is inherently complex and these comparisons should be taken as entertainment rather than definitive assessments.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [About page](/about) for detailed information
2. Review existing [GitHub Issues](../../issues)
3. Create a new issue with detailed information about your problem

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS 