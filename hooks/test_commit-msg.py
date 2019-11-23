#!/usr/bin/env python

import unittest
import importlib

class TestCommitMsg(unittest.TestCase):
    # commitMsgModule = importlib.import_module("commit-msg")

    def test_validate_length_greater_than_70_chars(self): 
        commit_msg_greater_than_70_characters = "Hello how is it going, this line has more than 70 characters, wow really, yes"
        self.assertRaises(SystemExit, validate_length([commit_msg_greater_than_70_characters]), msg="ERROR (length): Each line must have < {} characters".format(
                70))

    def test_validate_length_commit_msg_total_length_less(self):
        commit_msg_less_than_10_characters = "Hello"
        self.assertRaises(SystemExit, validate_length(commit_msg_total_length_more_than_76), msg="ERROR (length): Commit messages must have {min} < Characters < {max}".format(
            min=10, max=76))
                
    def test_validate_length_commit_msg_total_length_greater(self):
        commit_msg_total_length_more_than_76 = ["Hello how is it going?", "Hello how is it going?", "Hello how is it going?","Hello how is it going?"]
        self.assertRaises(SystemExit, validate_length(commit_msg_total_length_more_than_76), msg="ERROR (length): Commit messages must have {min} < Characters < {max}".format(
            min=10, max=76))

    def test_prefix_format_keyword(self):
        commit_message_wrong_format = "Hey there: how is it going."
        self.assertRaises(SystemExit, validate_prefix(commit_message_wrong_format), msg="ERROR (prefix): Must have format 'Keyword:'")

    def test_prefix_missing_fixes_issue_number(self):
        commit_message_fixes_no_number = "Fixes :hey this is a fix"
        self.assertRaises(SystemExit, validate_prefix(commit_message_fixes_no_number), msg="ERROR (prefix): keyword 'Fixes' must link github issue, e.g. 'Fixes #1:'. Otherwise 'Keyword:'")

    def test_prefix_add_hash_to_issue(self):
        commit_message_fixes_no_hash = "Fixes 123: where is the hash?"
        self.assertEqual("Fixes #123: where is the hash?", validate_prefix(commit_message_fixes_no_hash)), 
        
    def test_suffix(self):
        commit_msg_without_before = "Feature xyz added"
        commit_msg_without_after = validate_suffix(commit_msg_without_dot)
        self.assertEquals(commit_msg_without_before + ".", commit_msg_without_after)

if __name__ == '__main__':
    unittest.main()