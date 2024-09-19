Yale Accessions README
----------------------

# UMD Customizations

See [docs/Customizations.md](docs/Customizations.md) for a description of the
UMD customizations made to the stock
[hudmol/aspace_yale_accessions](https://github.com/hudmol/aspace_yale_accessions)
codebase.

The UMD customizations are based on version "0.10" from the upstream repository.

---

**Note: Git branches**

In this repository, the default "main" branch contains the UMD customizations
to the upstream
[hudmol/aspace_yale_accessions](https://github.com/hudmol/aspace_yale_accessions)
repository (which uses a "master" branch).

---

# Getting Started

Unzip the release and move it to:

    /path/to/archivesspace/plugins

Unzip it:

    $ cd /path/to/archivesspace/plugins
    $ unzip yale_accessions.zip -d yale_accessions

Enable the plugin by editing the file in `config/config.rb`:

    AppConfig[:plugins] = ['some_plugin', 'yale_accessions']

(Make sure you uncomment this line (i.e., remove the leading '#' if present))

See also:

  <https://github.com/archivesspace/archivesspace/blob/master/plugins/README.md>

You will need to shutdown archivesspace and migrate the database:

     $ cd /path/to/archivesspace
     $ scripts/setup-database.sh

See also:

  <https://github.com/archivesspace/archivesspace/blob/master/UPGRADING.md>

# How it works

Users with "Manage Repository" permissions will see a new menu item in the
Repository settings menu (click the gear icon to the right of the selected
repository). Use the "Department Codes" setting to add and remove codes for
your Repository.

Department codes will appear in a dropdown for the second part of the Accession
identifier.

The first and third sections of the identifier will be system-generated upon
saving the record. The fourth section will be removed.

# Increasing sequence numbers

If you've imported existing records into the system, you may need to
manually set the sequence numbers for your records so that the
auto-generated IDs don't clash with existing ones.

Suppose you have a department code called 'ycal'.  You can insert a
new sequence starting from 100 for 2015 with some SQL:

     insert into sequence (sequence_name, value) values ('yale_accession_2015_ycal', 100);

Or, if that sequence already exists, update it:

     update sequence set value = 100 where sequence_name = 'yale_accession_2015_ycal';
