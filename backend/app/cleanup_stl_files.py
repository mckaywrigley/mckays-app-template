import os
import glob
import argparse

def cleanup_stl_files(directory, dry_run=False):
    """
    Remove all STL files from the specified directory.
    
    Args:
        directory (str): Directory to clean up
        dry_run (bool): If True, only show what would be deleted without actually deleting
    """
    if not os.path.exists(directory):
        print(f"Directory {directory} does not exist.")
        return
    
    # Find all STL files
    stl_files = glob.glob(os.path.join(directory, "*.stl"))
    
    if not stl_files:
        print(f"No STL files found in {directory}.")
        return
    
    print(f"Found {len(stl_files)} STL files in {directory}.")
    
    # Delete files
    total_size = 0
    for file_path in stl_files:
        file_size = os.path.getsize(file_path)
        total_size += file_size
        
        if dry_run:
            print(f"Would delete: {os.path.basename(file_path)} ({file_size / 1024:.1f} KB)")
        else:
            try:
                os.remove(file_path)
                print(f"Deleted: {os.path.basename(file_path)} ({file_size / 1024:.1f} KB)")
            except Exception as e:
                print(f"Error deleting {file_path}: {str(e)}")
    
    print(f"Total space {'that would be' if dry_run else ''} freed: {total_size / (1024*1024):.2f} MB")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Clean up STL files from the static directory")
    parser.add_argument("--directory", default="static", help="Directory to clean up (default: static)")
    parser.add_argument("--dry-run", action="store_true", help="Show what would be deleted without actually deleting")
    
    args = parser.parse_args()
    
    # Use absolute path if a relative path is provided
    if not os.path.isabs(args.directory):
        base_dir = os.path.dirname(os.path.abspath(__file__))
        directory = os.path.join(base_dir, args.directory)
    else:
        directory = args.directory
    
    cleanup_stl_files(directory, args.dry_run)
