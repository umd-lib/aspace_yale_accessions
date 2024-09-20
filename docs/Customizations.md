# Customizations

## Introduction

This document describes the customizations made to the
[hudmol/aspace_yale_accessions](https://github.com/hudmol/aspace_yale_accessions)
plugin.

## UMD Customizations

### Auto-generate accession identifiers

**Jira Issue(s):** LIBASPACE-33, LIBASPACE-34

Auto-generate the sequence number in the "Identifier" field for accessions.

The "Identifier" field in an accession consists of a four-part identifier:

* An auto-generated date-based string (cannot be changed by user)
* A sequence number field (with a placeholder of "XXXX") that is auto-generated
  (based on next number available in system) when the record is created
  (cannot be changed by user)
* A "department code" dropdown, containing the department codes associated with
  the repository.
* An additional, user-editable free text field

**Note:** The sequence numbers are generated on a per-repository basis.

### Auto-generate resource identifiers

Auto-generate the sequence number in the "Identifier" field for resources.

The "Identifier" field in a resource consists of a four-part identifier:

* A sequence number field (with a placeholder of "XXXX") that is auto-generated
  (based on next number available in system) when the record is created
  (cannot be changed by user)
* A "department code" dropdown, containing the department codes associated with
  the repository.
* An additional, user-editable free text field
* An uneditable field (this part of the identifier is not used)

**Note:** The sequence numbers are generated on a per-repository basis.

## Verification Steps

The following steps are intended to verify that the "umd-lib/aspace_yale_accessions"
plugin is working properly (so it also tests functionality provided by the
upstream "hudmol/aspace_yale_accessions" plugin).

When running these steps in the local development environment, it is assumed
that the sample data has been loaded, and the "UMD_TEST" repository has been
selected.

**Note:** The following steps add an accession, a resource, and (possibly) one
or more department codes, so they should not be run in production.

1) In a web browser, go to the ArchivesSpace front-end (staff) home page. Login
   as a user with "admin" permissions.

2) Once logged in to ArchiveSpace, left-click the "Repository settings"
   drop-down (looks like a gear) next to the selected repository on the
   right of the navigation bar.

   Verify that a "Department Codes" menu entry is present either directly in the
   "Repository settings" drop-down (in the local development environment), or
   as "Plugins | Department Codes" (on the servers). The difference is caused
   by additional plugins being configured on the servers that also have
   "Respository settings" menu entries.

   If there are no department codes (which may be the case in the local
   development environment), add at least two codes (such as `FOO` and `BAR`)
   by entering the codes, one at a time, hitting the `Enter` key after each
   code, left-clicking the "Save" button once all the codes have been added.

3) From the navigation bar, left-click "Create Accession". The "New Accession"
   form will be shown.

4) On the "New Accession" form, verify that, in the four-part "Identifier"
   field:

   * the second component has an "XXXX" placeholder, and is not editable
   * The third component has is a drop-down list consisting of the department
     codes
   * The fourth component is empty, but is editable.

5) Create a new accession by filling out the following fields:

    | Field      | Value |
    | ---------- | ----- |
    | Title      | Test Accession |
    | Identifier | [Select one of the department codes from the dropdown] |

   then left-click the "Save Accession" button.

   The form should refresh, with a message indicating that an accession has been
   created.

6) In the breadcrumb list underneath the navigation bar, left-click the
   "Test Accession" breadcrumb. The "Test Accession" detail page will be
   displayed.

7) On the "Test Accession" detail page, verify that in the four-part
   "Identifier" field, the second component is a numeric value such as `0001`
   and the third component matches the department code selected in the previous
   steps.

8) From the navigation bar, left-click "Create Resource". The "New Resource"
   form will be shown.

9) On the "New Resource" form, verify that, in the four-part "Identifier"
   field:

   * the first component has an "XXXX" placeholder, and is not editable
   * The second component has is a drop-down list consisting of the department
     codes
   * The third component is empty, but is editable.
   * The fourth component is empty, and *not* editable.

10) Create a new resource by filling out the following fields (the defaults are
   acceptable in the other fields):

    | Field             | Value |
    | ----------------- | ----- |
    | Title             | Test Resource |
    | Identifier        | [Select one of the department codes from the dropdown] |
    | Dates \| Type     | [Select "Single" and then add any date for the "Begin" field] |
    | Extents \| Number | 1.0 |

    then left-click the "Save Resource" button.

    The form should refresh, with a message indicating that a resource has been
    created.

11) In the breadcrumb list underneath the navigation bar, left-click the
   "Test Resource" breadcrumb. The "Test Resource" detail page will be
   displayed.

12) On the "Test Resource" detail page, verify that in the four-part
   "Identifier" field, the first component is a numeric value such as `0001`
   and the second component matches the department code selected in the previous
   steps.
