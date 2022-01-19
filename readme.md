How to build docker image?

1. Bump the version - Run `yarn bump:pre`
2. Push the code - Run `git push origin master`
3. Release on github - Run `gh release create v0.1.1-alpha.1 --notes "v0.1.1-alpha.1" -p`
   - Replace `v0.1.1-alpha.1` with new version generated by bump:pre command
