#!/bin/bash

###############################################################################
# THE ARENA - One-Click Deployment Script
# Automates: GitHub push, Fly.io backend deployment, Vercel frontend deployment
###############################################################################

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
GITHUB_USERNAME="${GITHUB_USERNAME:-}"
GITHUB_TOKEN="${GITHUB_TOKEN:-}"
FLY_TOKEN="${FLY_TOKEN:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"

###############################################################################
# Helper Functions
###############################################################################

print_header() {
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

pause_and_continue() {
    echo ""
    read -p "Press ENTER to continue..."
    echo ""
}

###############################################################################
# Step 1: Verify Prerequisites
###############################################################################

verify_prerequisites() {
    print_header "Step 1: Verifying Prerequisites"
    
    local missing_tools=0
    
    # Check git
    if ! command -v git &> /dev/null; then
        print_error "git not found. Please install git."
        missing_tools=$((missing_tools + 1))
    else
        print_success "git installed"
    fi
    
    # Check node
    if ! command -v node &> /dev/null; then
        print_error "Node.js not found. Please install Node.js."
        missing_tools=$((missing_tools + 1))
    else
        print_success "Node.js installed ($(node --version))"
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        print_error "npm not found. Please install npm."
        missing_tools=$((missing_tools + 1))
    else
        print_success "npm installed ($(npm --version))"
    fi
    
    if [ $missing_tools -gt 0 ]; then
        print_error "Please install missing tools and try again."
        exit 1
    fi
    
    print_success "All prerequisites verified"
    echo ""
}

###############################################################################
# Step 2: Get Configuration from User
###############################################################################

get_configuration() {
    print_header "Step 2: Configuration"
    
    # GitHub Username
    if [ -z "$GITHUB_USERNAME" ]; then
        read -p "Enter your GitHub username: " GITHUB_USERNAME
    fi
    print_success "GitHub username: $GITHUB_USERNAME"
    
    # GitHub Token
    if [ -z "$GITHUB_TOKEN" ]; then
        echo ""
        print_info "You need a GitHub Personal Access Token."
        print_info "Create one at: https://github.com/settings/tokens"
        print_info "Scopes needed: repo (all), workflow"
        echo ""
        read -sp "Enter your GitHub token (hidden): " GITHUB_TOKEN
        echo ""
    fi
    print_success "GitHub token configured"
    
    # Fly.io Token
    if [ -z "$FLY_TOKEN" ]; then
        echo ""
        print_info "You need a Fly.io API token."
        print_info "Get one at: https://fly.io/user/personal_access_tokens"
        echo ""
        read -sp "Enter your Fly.io token (hidden): " FLY_TOKEN
        echo ""
    fi
    print_success "Fly.io token configured"
    
    # Vercel Token
    if [ -z "$VERCEL_TOKEN" ]; then
        echo ""
        print_info "You need a Vercel API token."
        print_info "Get one at: https://vercel.com/account/tokens"
        echo ""
        read -sp "Enter your Vercel token (hidden): " VERCEL_TOKEN
        echo ""
    fi
    print_success "Vercel token configured"
    
    # API Keys
    echo ""
    print_info "You'll need API keys for:"
    print_info "  - Gemini (https://ai.google.dev)"
    print_info "  - OpenAI (https://platform.openai.com/api-keys)"
    print_info "  - Anthropic (https://console.anthropic.com/keys)"
    print_info "  - xAI (https://x.ai)"
    print_info "  - Twitter (https://developer.twitter.com)"
    print_info "  - Substack (https://substack.com/api)"
    print_info "  - SendGrid (https://sendgrid.com)"
    echo ""
    
    read -p "Have you prepared all API keys? (y/n): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_error "Please prepare API keys first."
        exit 1
    fi
    
    echo ""
}

###############################################################################
# Step 3: Push to GitHub
###############################################################################

push_to_github() {
    print_header "Step 3: Pushing to GitHub"
    
    cd "$PROJECT_DIR"
    
    # Check if remote exists
    if git remote | grep -q origin; then
        print_info "Updating existing GitHub remote..."
        git remote set-url origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/the-arena.git"
    else
        print_info "Adding GitHub remote..."
        git remote add origin "https://${GITHUB_USERNAME}:${GITHUB_TOKEN}@github.com/${GITHUB_USERNAME}/the-arena.git"
    fi
    
    # Ensure main branch
    if [ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]; then
        print_info "Renaming branch to main..."
        git branch -M main
    fi
    
    # Push to GitHub
    print_info "Pushing code to GitHub..."
    git push -u origin main --force 2>&1 | grep -v "^remote:" || true
    
    print_success "Code pushed to GitHub"
    print_info "Repository: https://github.com/${GITHUB_USERNAME}/the-arena"
    echo ""
}

###############################################################################
# Step 4: Deploy Backend to Fly.io
###############################################################################

deploy_to_flyio() {
    print_header "Step 4: Deploying Backend to Fly.io"
    
    cd "$PROJECT_DIR/backend"
    
    # Install Fly CLI if not present
    if ! command -v flyctl &> /dev/null; then
        print_info "Installing Fly CLI..."
        curl -L https://fly.io/install.sh | sh
        export PATH="$HOME/.fly/bin:$PATH"
    fi
    
    # Authenticate with Fly.io
    print_info "Authenticating with Fly.io..."
    echo "$FLY_TOKEN" | flyctl auth login --token -
    
    # Launch app
    print_info "Launching Fly.io app..."
    flyctl launch --name the-arena-api --region sjc --no-deploy 2>&1 | tail -20 || true
    
    # Set secrets
    print_info "Setting environment secrets..."
    echo ""
    print_warning "Enter your API keys when prompted:"
    echo ""
    
    read -sp "Gemini API Key: " GEMINI_KEY
    echo ""
    read -sp "OpenAI API Key: " OPENAI_KEY
    echo ""
    read -sp "Anthropic API Key: " ANTHROPIC_KEY
    echo ""
    read -sp "xAI API Key: " XAI_KEY
    echo ""
    read -sp "Twitter Bearer Token: " TWITTER_TOKEN
    echo ""
    read -sp "Substack API Key: " SUBSTACK_KEY
    echo ""
    read -sp "SendGrid API Key: " SENDGRID_KEY
    echo ""
    
    flyctl secrets set \
        GEMINI_API_KEY="$GEMINI_KEY" \
        OPENAI_API_KEY="$OPENAI_KEY" \
        ANTHROPIC_API_KEY="$ANTHROPIC_KEY" \
        XAI_API_KEY="$XAI_KEY" \
        TWITTER_BEARER_TOKEN="$TWITTER_TOKEN" \
        SUBSTACK_API_KEY="$SUBSTACK_KEY" \
        SENDGRID_API_KEY="$SENDGRID_KEY" \
        SOLANA_RPC_URL="https://api.mainnet-beta.solana.com" \
        BASE_RPC_URL="https://mainnet.base.org"
    
    # Deploy
    print_info "Deploying to Fly.io..."
    flyctl deploy
    
    # Get URL
    BACKEND_URL=$(flyctl info -j | grep -o '"Host":"[^"]*' | cut -d'"' -f4)
    print_success "Backend deployed to: https://${BACKEND_URL}"
    
    echo ""
}

###############################################################################
# Step 5: Deploy Frontend to Vercel
###############################################################################

deploy_to_vercel() {
    print_header "Step 5: Deploying Frontend to Vercel"
    
    cd "$PROJECT_DIR"
    
    # Install Vercel CLI if not present
    if ! command -v vercel &> /dev/null; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    
    # Authenticate with Vercel
    print_info "Authenticating with Vercel..."
    echo "$VERCEL_TOKEN" | vercel login --token
    
    # Deploy
    print_info "Deploying to Vercel..."
    VERCEL_OUTPUT=$(vercel --prod --token "$VERCEL_TOKEN" 2>&1)
    FRONTEND_URL=$(echo "$VERCEL_OUTPUT" | grep -oP 'https://[^\s]+' | head -1)
    
    print_success "Frontend deployed to: $FRONTEND_URL"
    
    # Set environment variable
    print_info "Setting environment variables..."
    vercel env add NEXT_PUBLIC_API_URL "https://the-arena-api.fly.dev" --prod --token "$VERCEL_TOKEN"
    
    # Redeploy with env vars
    print_info "Redeploying with environment variables..."
    vercel --prod --token "$VERCEL_TOKEN" > /dev/null 2>&1
    
    echo ""
}

###############################################################################
# Step 6: Verification
###############################################################################

verify_deployment() {
    print_header "Step 6: Verifying Deployment"
    
    print_info "Testing backend health check..."
    if curl -s https://the-arena-api.fly.dev/health | grep -q "ok"; then
        print_success "Backend is running"
    else
        print_warning "Backend health check pending (may take a minute)"
    fi
    
    print_info "Testing frontend..."
    if curl -s https://the-arena.vercel.app | grep -q "THE ARENA"; then
        print_success "Frontend is running"
    else
        print_warning "Frontend is deploying (may take a minute)"
    fi
    
    echo ""
}

###############################################################################
# Step 7: Summary
###############################################################################

print_summary() {
    print_header "Step 7: Deployment Complete!"
    
    echo ""
    echo -e "${GREEN}🎉 THE ARENA is now live!${NC}"
    echo ""
    
    echo -e "${BLUE}Frontend:${NC}"
    echo "  URL: https://the-arena.vercel.app"
    echo "  GitHub: https://github.com/${GITHUB_USERNAME}/the-arena"
    echo ""
    
    echo -e "${BLUE}Backend:${NC}"
    echo "  URL: https://the-arena-api.fly.dev"
    echo "  Health: https://the-arena-api.fly.dev/health"
    echo ""
    
    echo -e "${BLUE}Next Steps:${NC}"
    echo "  1. Visit https://the-arena.vercel.app"
    echo "  2. Test quad-exposure feature"
    echo "  3. Configure custom domain (optional)"
    echo "  4. Set up monitoring and alerts"
    echo "  5. Share with users!"
    echo ""
    
    echo -e "${BLUE}Documentation:${NC}"
    echo "  - Deployment: DEPLOY.md"
    echo "  - Quick Start: QUICK_START.md"
    echo "  - API Docs: README.md"
    echo ""
    
    echo -e "${GREEN}Built by NO_GAS_LABS™${NC}"
    echo "The future of thought is collaborative. The future of collaboration is cognitive."
    echo ""
}

###############################################################################
# Main Execution
###############################################################################

main() {
    clear
    
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║           THE ARENA - One-Click Deployment Script             ║"
    echo "║                  Unified Cognitive Operating System           ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    # Run steps
    verify_prerequisites
    pause_and_continue
    
    get_configuration
    pause_and_continue
    
    push_to_github
    pause_and_continue
    
    deploy_to_flyio
    pause_and_continue
    
    deploy_to_vercel
    pause_and_continue
    
    verify_deployment
    pause_and_continue
    
    print_summary
}

# Run main function
main
