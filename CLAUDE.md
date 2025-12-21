# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pinyin Reader is a web application that converts Chinese text to Pinyin (romanized Chinese) with tone marks and definitions. It helps users learn Chinese by providing interactive translations with HSK (Hanyu Shuiping Kaoshi) level indicators and dictionary definitions.

Live demo: https://ganaga.github.io/pinyin-reader/client/

## Repository Structure

The project is split into two main components:

### `/client` - Frontend Web Application
- **Static web app** (HTML/CSS/JS) that runs in the browser
- Uses jQuery and Bootstrap 5
- Main files:
  - `index.html` - Main translation interface
  - `options.html` - History page showing previously translated texts
  - `pinyin-reader.js` - Core PinyinReader class that handles text parsing and display
  - `pinyin.json` - Large dictionary file (~10MB) containing Chinese-to-Pinyin mappings with definitions and HSK levels

### `/node` - Dictionary Generator & Dev Server
- **Node.js scripts** for building the dictionary and running a local dev server
- Main files:
  - `index.js` - Express server that serves the client on port 3000
  - `parser.js` - Generates `pinyin.json` from CC-CEDICT and HSK vocabulary data
  - `pinyin.js` - Utilities for normalizing Pinyin (converting numeric tones to accented characters)

## Development Commands

### Running the Development Server
```bash
cd node
npm install
npm start
```
This starts an Express server on http://localhost:3000 that serves the client application.

### Regenerating the Dictionary
```bash
cd node
node parser.js
```
This script:
1. Downloads CC-CEDICT dictionary data (requires `cedict_ts.u8` file)
2. Fetches HSK vocabulary levels 1-6 from GitHub
3. Processes and combines the data
4. Outputs `../client/pinyin.json` with normalized Pinyin and HSK levels

Note: The `cedict_ts.u8` file must be present in the `node/` directory. Download it from CC-CEDICT.

## Architecture & Data Flow

### Dictionary Structure
The `pinyin.json` file maps Chinese characters/words to objects containing:
- `p` (string): Pinyin pronunciation with tone marks (e.g., "nǐhǎo")
- `d` (array): English definitions
- `h` (number, optional): HSK level (1-6), used for color coding

### Text Parsing Algorithm
The `PinyinReader.getParts()` method uses a greedy longest-match algorithm:
1. Starts at position `i` in the input text
2. Checks substrings of length 1-5 characters starting at `i`
3. Finds the longest match in the dictionary
4. Advances position by the matched length
5. Falls back to single character if no match found

This approach prioritizes multi-character words over single characters to provide better context.

### Color Coding by HSK Level
Words are color-coded based on their HSK difficulty level:
- HSK 1-2: Blue (`#737cfa`)
- HSK 3: Orange (`rgb(219, 144, 108)`)
- HSK 4: Light red (`rgb(224, 118, 107)`)
- HSK 5: Red (`rgb(228, 93, 107)`)
- HSK 6: Dark red (`rgb(233, 68, 106)`)

### Local Storage
The application uses browser localStorage to persist:
- `text` - The most recently translated text
- `history` - Array of previously translated texts with timestamps (JSON format)

## Key Technical Details

### Pinyin Normalization
The `pinyin.js` module converts numeric tone notation to Unicode accented characters:
- Input: `"ni3hao3"` → Output: `"nǐhǎo"`
- Handles tone placement rules (priority: a > e > ou > last vowel)
- Supports ü/v character conversion

### Frontend Dependencies
- jQuery 3.6.0 for DOM manipulation and AJAX
- Bootstrap 5.1.3 for UI components and styling
- Bootstrap tooltips display word definitions on hover

### Backend Dependencies
- `express` - Web server
- `parse-cc-cedict` - Parses CC-CEDICT dictionary format
- `axios` - HTTP client for fetching HSK vocabulary data
