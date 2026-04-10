#!/bin/bash

###############################################################################
# THE ARENA - Vercel Deployment Script
# Deploy frontend to Vercel with one command
###############################################################################

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

###############################################################################
# Main
###############################################################################

main() {
    clear
    
    echo -e "${BLUE}"
    echo "╔════════════════════════════════════════════════════════════════╗"
    echo "║        THE ARENA - Vercel Deployment                          ║"
    echo "║                  Frontend Production Deployment               ║"
    echo "╚════════════════════════════════════════════════════════════════╝"
    echo -e "${NC}"
    echo ""
    
    print_header "Step 1: Verifying Prerequisites"
    
    if ! command -v npm &> /dev/null; then
        print_error "npm not found"
        exit 1
    fi
    print_success "npm installed"
    
    if ! command -v vercel &> /dev/null; then
        print_info "Installing Vercel CLI..."
        npm install -g vercel
    fi
    print_success "Vercel CLI installed"
    
    echo ""
    print_header "Step 2: Deploy to Vercel"
    
    cd /home/ubuntu/the-arena-website
    
    print_info "Deploying to Vercel..."
    vercel --prod
    
    echo ""
    print_header "Step 3: Deployment Complete!"
    
    echo -e "${GREEN}🎉 Frontend deployed to Vercel!${NC}"
    echo ""
    echo "Your app is now live at:"
    echo "https://the-arena.vercel.app"
    echo ""
    echo "Or with custom domain:"
    echo "https://your-domain.com"
    echo ""
    
    print_success "Deployment complete"
}

main
