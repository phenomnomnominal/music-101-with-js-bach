#!/usr/bin/env node
const path = require('path');
const execa = require('execa');
const fs = require('fs-extra');

async function build() {
  const gatsby = async () => {
    await execa('gatsby', ['clean'], {
      cwd: __dirname,
      stdio: 'inherit',
      preferLocal: true
    });
    return execa('gatsby', ['build'], {
      cwd: __dirname,
      stdio: 'inherit',
      preferLocal: true
    });
  };

  await gatsby();
  const public = path.join(__dirname, 'public');
  const dist = path.join(process.cwd(), 'public');
  if (public === dist) {
    return;
  }

  fs.copySync(public, dist);
}

build();
