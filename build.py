#!/usr/bin/python3

import os, os.path, re, zipfile, json, shutil

def get_files_to_zip():
    #Exclude git stuff, build scripts etc.
    exclude = [
        r'\.(py|sh|pem)$', #file endings
        r'(\\|/)\.', #hidden files
        r'package\.json|icon\.html|updates\.json|visma\.js', #file names
        r'(\\|/)(promo|unittest|build|web-ext-artifacts)(\\|/)' #folders
    ]

    zippable_files = []
    for root, folders, files in os.walk('.'):
        #print(root)
        for f in files:
            file = os.path.join(root,f)
            if not any(re.search(p, file) for p in exclude):
                zippable_files.append(file)
    return zippable_files


def create_addon(files, browser):
    output_folder = 'build'
    if not os.path.isdir(output_folder):
        os.mkdir(output_folder)

    output_dir = os.path.join(output_folder, 'testdata-%s' % (browser))
    
    if os.path.isdir(output_dir):
        os.rename(output_dir, output_dir+"_temp")
        shutil.rmtree(output_dir+"_temp")
        
    os.mkdir(output_dir)       

    print('')
    print('**** Creating addon for %s ****' % browser)

    for f in files:
        print('Adding', f)
        of = os.path.join(output_dir, f)
        os.makedirs(os.path.dirname(of), exist_ok=True)
        if f.endswith('manifest.json'):
            with open(f) as inF:
                manifest = json.load(inF)
            if browser != 'firefox':
                del manifest['applications'] #Firefox specific, and causes warnings in other browsers...

            #if browser == 'firefox':
            #    del manifest['background']['persistent'] #Firefox chokes on this, is always persistent anyway

            with open(of, "w") as outF:
                outF.write(json.dumps(manifest, indent=2)) 
        else:
            shutil.copy(f, of)

    if browser == "chrome":
        shutil.make_archive(output_dir, "zip", output_dir)

    #if browser == 'opera':
        #Create .nex
    #    os.system('./nex-build.sh %s %s %s' % (output_file, output_file.replace('.zip', '.nex'), cert))



if __name__ == '__main__':
    #Make sure we can run this from anywhere
    folder = os.path.dirname(os.path.realpath(__file__))
    os.chdir(folder)

    files = get_files_to_zip()
    
    print('******* EXTENSION BUILD SCRIPT *******')
    print('')

    create_addon(files, 'chrome')
    #create_addon(files, 'opera')
    create_addon(files, 'firefox')
