#!/bin/bash
      # Helper script for Gradle to call npm on macOS in case it is not found
      export PATH=$PATH:/usr/local/lib/node_modules/npm/node_modules/npm-lifecycle/node-gyp-bin:/Users/becca/Code/Recipes/node_modules/nodejs-mobile-react-native/node_modules/.bin:/Users/becca/Code/Recipes/node_modules/.bin:/Library/Frameworks/Python.framework/Versions/3.6/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/becca/Library/Android/sdk/emulator:/Users/becca/Library/Android/sdk/tools:/Users/becca/Library/Android/sdk/tools/bin:/Users/becca/Library/Android/sdk/platform-tools
      npm $@
    