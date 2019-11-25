import os
import sys
import glob

path_pattern = "**/*.js"
if len(sys.argv) > 1:
    rootdir = sys.argv[1]
    path_pattern = rootdir + path_pattern

for file in glob.iglob(path_pattern, recursive=True):
    command = "babel --plugins babel-plugin-flow-to-typescript "
    ts_file = file[:-2] + "ts"
    full_command = ("%s %s -o %s" % (command, file, ts_file))
    print(full_command)
    os.system(full_command)
