# Roam & Root — Travel & Tour Agency

A beginner-friendly, responsive travel website built with plain HTML, CSS, and JavaScript. It is a fictional project inspired by the travel-agency brief in the supplied screenshot.

## Pages

- `index.html` — home page with a photo slider, destination search, and testimonial carousel
- `destinations.html` — destination finder
- `packages.html` — sample trip packages
- `destination-details.html` — trip details and a live cost estimate
- `booking.html` — booking enquiry form with browser validation
- `blog.html` — travel journal cards
- `contact.html` — contact information and contact form
- `about.html`, `privacy.html`, `terms.html` — supporting pages linked from the site

## Run it locally

Open `index.html` in a browser. No install step or build command is needed. The photos and typefaces use external URLs, so those parts need an internet connection.

## Put it on GitHub

1. Create a new empty repository on GitHub.
2. Open this `travel-tour-agency` folder in your editor.
3. In the terminal, run `git init`, `git add .`, `git commit -m "Add travel agency website"`, and `git branch -M main`.
4. Add your GitHub repository as the `origin` remote, then run `git push -u origin main`.

GitHub shows the exact remote URL and commands for your new repository. Keep the repository public if you want to share it easily.

## Publish on Vercel

1. Sign in to Vercel with GitHub and choose **Add New → Project**.
2. Import the repository containing this folder. If the project lives in a larger repository, set the **Root Directory** to `travel-tour-agency`.
3. Choose **Other** as the framework preset. Leave the build and output commands empty; this is a static website.
4. Select **Deploy**. Vercel will provide a shareable URL and can redeploy when you push updates to GitHub.

## Before using it as a real business site

The brand, contact details, package prices, testimonials, and legal pages are sample content. The forms currently validate in the browser and show a demo confirmation; they do not send or save submissions. Connect them to a form service or backend before relying on them. Replace the example contact and policy text before collecting personal information.
