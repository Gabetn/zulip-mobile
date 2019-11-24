#!/usr/bin/env python

import unittest
import importlib
from validations import *


class TestCommitMsg(unittest.TestCase):

    def test_validate_maximum_line_length(self):
        large_commit_msg_line = "Commit: Hello this line is too long, infact it's exactly 71 characters"
        self.assertRaises(SystemExit, validate_length([large_commit_msg_line]), msg="ERROR (length): Each line must have < {} characters".format(
            MAX_LINE_LENGTH))

    def test_validate_minimum_message_length(self):
        small_commit_msg = "Hello"
        with self.assertRaises(SystemExit) as cm:
            validate_length(small_commit_msg)
        error_msg = "ERROR (length): Commit messages must have {min} < Characters < {max}".format(
            min=MIN_CHARS, max=MAX_CHARS)
        self.assertEqual(cm.exception.code, error_msg)

    def test_validate_maximum_message_length(self):
        commit_msg_total_length_more_than_76 = [
            "This is line 1", "This is line 2", "This is line 3", "This is line 4"]
        self.assertRaises(SystemExit, validate_length(commit_msg_total_length_more_than_76), msg="ERROR (length): Commit messages must have {min} < Characters < {max}".format(
            min=MIN_CHARS, max=MAX_CHARS))

    def test_prefix_format_keyword(self):
        commit_message_wrong_format = "Hey there: how is it going."
        with self.assertRaises(SystemExit) as cm:
            validate_prefix(commit_message_wrong_format)
        self.assertEqual(cm.exception.code,
                         "ERROR (prefix): Must have format 'Keyword:'")

    def test_prefix_incorrect_keyword(self):
        commit_message_fixes_no_number = "Module #1: migration to v3"
        with self.assertRaises(SystemExit) as cm:
            validate_prefix(commit_message_fixes_no_number)
        self.assertEqual(
            cm.exception.code, "ERROR (prefix): keyword 'Fixes' must link github issue, e.g. 'Fixes #1:'. Otherwise 'Keyword:'")

    def test_prefix_add_hash_to_issue(self):
        commit_message_fixes_no_hash = "Fixes 123: where is the hash?"
        self.assertEqual("Fixes #123: where is the hash?",
                         validate_prefix(commit_message_fixes_no_hash)),

    def test_suffix(self):
        commit_msg_without_before = "Feature xyz added"
        commit_msg_without_after = validate_suffix(commit_msg_without_before)
        self.assertEquals(commit_msg_without_before +
                          SUFFIX, commit_msg_without_after)


if __name__ == '__main__':
    unittest.main()
