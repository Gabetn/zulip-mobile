#!/usr/bin/env python

import sys
import re

MAX_CHARS = 76
MIN_CHARS = 10
MAX_LINE_LENGTH = 70
SUFFIX = '.'


def main():
    FILE_PATH = sys.argv[1]
    commit_msg = ""
    with open(FILE_PATH, "r") as f:
        commit_msg = f.read()
    processed_msg = commit_msg

    validate_length(commit_msg.splitlines())
    processed_msg = validate_prefix(processed_msg)
    processed_msg = validate_suffix(processed_msg)

    if commit_msg != processed_msg:
        with open(FILE_PATH, 'w') as f:
            f.write(processed_msg)
            print("SUCCESS: updated commit message to:\n'{}'".format(processed_msg))
    sys.exit(0)


def validate_length(lines):
    num_chars = 0
    for i in range(0, len(lines)):
        line = lines[i]
        if len(line) > MAX_LINE_LENGTH:
            sys.exit("ERROR (length): Each line must have < {} characters".format(
                MAX_LINE_LENGTH))
        num_chars += len(line)
    if num_chars > MAX_CHARS or num_chars < MIN_CHARS:
        sys.exit("ERROR (length): Commit messages must have {min} < Characters < {max}".format(
            min=MIN_CHARS, max=MAX_CHARS))


def validate_prefix(message):
    prefix = re.match("^[A-Za-z_0-9]+:", message)  # e.g. keyword: msg
    prefix_fixes = re.match(
        "^([A-Za-z_0-9]+) (#?[0-9]+):", message)  # e.g.Fixes #1: msg
    if (prefix is None and prefix_fixes is None):
        sys.exit("ERROR (prefix): Must have format 'Keyword:'")

    if prefix_fixes:
        if prefix_fixes.group(1).lower() != "fixes":
            sys.exit(
                "ERROR (prefix): keyword 'Fixes' must link github issue, e.g. 'Fixes #1:'. Otherwise 'Keyword:'")
        elif prefix_fixes.group(2)[:1] != '#':
            offset = prefix_fixes.span(2)[0]
            message = message[:offset]+'#'+message[offset:]
    return message


def validate_suffix(message):
    if not message.endswith(SUFFIX):
        message = message.rstrip() + SUFFIX
    return message


if __name__ == "__main__":
    main()
