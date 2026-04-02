"""
HM36 Skill Swap Platform - Complete Build Script
This script builds the ENTIRE platform in one command
"""
import os
import sys

def run_part(part_number, script_name):
    """Run a build part script"""
    print(f"\n{'='*70}")
    print(f"  RUNNING PART {part_number}")
    print(f"{'='*70}\n")
    
    result = os.system(f'python "{script_name}"')
    if result != 0:
        print(f"\n❌ Part {part_number} failed!")
        return False
    return True

def main():
    print("\n" + "="*70)
    print("  HM36 SKILL SWAP PLATFORM - COMPLETE BUILD")
    print("  Building full-stack MERN application...")
    print("="*70)
    
    parts = [
        ("BUILD_PLATFORM_PART1.py", "Backend Server Files"),
        ("BUILD_PLATFORM_PART2.py", "React Components"),
        ("BUILD_PLATFORM_PART3.py", "React Pages"),
        ("BUILD_PLATFORM_PART4.py", "CSS Styles & Docs"),
    ]
    
    for i, (script, description) in enumerate(parts, 1):
        print(f"\n📦 Part {i}/4: {description}")
        if not run_part(i, script):
            return 1
    
    print("\n" + "="*70)
    print("  ✅ PLATFORM BUILD COMPLETE!")
    print("="*70)
    print("\n🎉 Your HM36 Skill Swap Platform is ready!\n")
    print("📁 Location: Skill swap parter project\\skill-swap-platform\\\n")
    print("📖 Next Steps:")
    print("   1. cd \"Skill swap parter project\\skill-swap-platform\\server\"")
    print("   2. npm install")
    print("   3. Copy .env.example to .env and configure")
    print("   4. cd ..\\client && npm install")
    print("   5. Start MongoDB")
    print("   6. Run: npm run dev (in server folder)")
    print("   7. Run: npm start (in client folder)")
    print("\n📚 See BUILD_GUIDE.md for detailed instructions!\n")
    print("="*70)
    
    return 0

if __name__ == "__main__":
    sys.exit(main())
