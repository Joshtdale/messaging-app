#!/bin/bash
# Ensure the Create React App development web server port is 3000 to match the local debugger configuration
echo "export PORT=3000" >> ~/.bashrc.d/create-react-app_webpack-devserver_gitpod-ports.sh
### Change Create React App development web server websocket port to 443 to allow access through the Gitpod proxy
# The Gitpod proxy does not permit ports other than 443. By switching this value, the server running on 3000 can be accessed through the proxy.
# Websocket errors in the console can only be avoided automatically for the Gitpod web IDE or the local IDE, but not both at the same time.
# Since most Bootcampers will be using the Web IDE, our default configuration supports that.
# To remove the errors when working locally, you can run `unset WDS_SOCKET_PORT` before running the dev server to revert to the default port
echo "export WDS_SOCKET_PORT=443" >> ~/.bashrc.d/create-react-app_webpack-devserver_gitpod-ports.sh
