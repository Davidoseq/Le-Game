import * as fs from "fs";
import * as Q from "q";
import {ImplementException} from "../exception/ImplementException";

/**
 * DEFAULT - File is visible to the calling process.
 * READ - File can be read by the calling process.
 * WRITE - File can be written by the calling process.
 * EXECUTE - File can be executed by the calling process.
 * This has no effect on Windows (will behave like DEFAULT).
 */
export enum FilePermission {
    DEFAULT = fs.F_OK,
    READ    = fs.R_OK,
    WRITE   = fs.W_OK,
    EXECUTE = fs.X_OK
}

export const AccessFlags = {
    /** Open file for reading. An exception occurs if the file does not exist. */
    R_ONLY: "r",

    /** Open file for reading and writing. An exception occurs if the file does not exist. */
    RW_ONLY: "r+",

    /** Open file for writing. The file is created (if it does not exist) or truncated (if it exists). */
    W_ONLY: "w",

    /** Like W_ONLY but fails if path exists. */
    W_STRICT: "wx",

    /** Open file for reading and writing. The file is created (if it does not exist) or truncated (if it exists).  */
    WR_ONLY: "w+",

    /** Like WR_ONLY but fails if path exists. */
    WR_STRICT: "wx+",

    /** Open file for appending. The file is created if it does not exist. */
    APPEND: "a",

    /**  Like APPEND but fails if path exists. */
    APPEND_STRICT: "ax",

    /** Open file for reading and appending. The file is created if it does not exist. */
    APPEND_R: "a+",

    /** Like APPEND_R but fails if path exists. */
    APPEND_R_STRICT: "ax+"
};

export class FileSystem {

    /**
     * Tests a user's permissions for the file specified by path
     *
     * @param path
     * @param mode
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static access(path: string, mode: number = FilePermission.DEFAULT): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.access, [path, mode]);
    }

    /**
     * Asynchronously append data to a file,
     * creating the file if it does not yet exist
     *
     * @param file
     * @param data
     * @param options
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static appendFile(file: string, data: string|Buffer, options: { encoding?: string; mode?: number; flag?: string; } = {}): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.appendFile, [file, data, options]);
    }

    /**
     * Change permissions of a file
     *
     * @param path
     * @param mode
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static chmod(path: string, mode: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.chmod, [path, mode]);
    }

    /**
     * Change ownership of a file
     *
     * @param path
     * @param uid
     * @param gid
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static chown(path: string, uid: number, gid: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.chown, [path, uid, gid]);
    }

    /**
     * close a file descriptor
     *
     * @param fd
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static close(fd: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.close, [fd]);
    }

    // TODO
    public static createReadStream(path: string, options): void {
        throw new ImplementException();
    }

    /**
     * Change permissions of a file
     *
     * @param fd
     * @param mode
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static fchmod(fd: string, mode: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.fchmod, [fd, mode]);
    }

    /**
     * Change ownership of a file
     *
     * @param path
     * @param uid
     * @param gid
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static fchown(path: string, uid: number, gid: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.fchown, [path, uid, gid]);
    }

    // TODO
    public static fdatasync(fd: string): Q.Promise<void|NodeJS.ErrnoException> {
        throw new ImplementException();
    }

    /**
     * Get file status
     *
     * @param fd
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static fstat(fd: string): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.fstat, [fd]);
    }

    /**
     * Synchronize a file's in-core state with storage
     *
     * @param fd
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static fsync(fd: string): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.fsync, [fd]);
    }

    /**
     * Truncate a file to a specified length
     *
     * @param fd
     * @param len
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static ftruncate(fd: string, len: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.ftruncate, [fd]);
    }

    /**
     * Change the file timestamps of a file referenced by the supplied file descriptor.
     *
     * @param fd
     * @param atime
     * @param mtime
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static futimes(fd: string, atime: number, mtime: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.futimes, [fd]);
    }

    /**
     * Change mode of file
     *
     * @param path
     * @param mode
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static lchmod(path: string, mode: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.lchmod, [path, mode]);
    }

    /**
     * Change ownership of a file
     *
     * @param path
     * @param uid
     * @param gid
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static lchown(path: string, uid: number, gid: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.lchown, [path, uid, gid]);
    }

    /**
     * Make a new name for a file
     *
     * @param srcpath
     * @param dstpath
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static link(srcpath: string, dstpath: string): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.link, [srcpath, dstpath]);
    }

    /**
     * lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to.
     *
     * @param path
     * @returns {Promise<fs.Stats|NodeJS.ErrnoException>}
     */
    public static lstat(path: string): Q.Promise<fs.Stats|NodeJS.ErrnoException> {
        return Q.nfapply<fs.Stats|NodeJS.ErrnoException>(fs.lstat, [path]);
    }

    /**
     * Create a directory
     *
     * @param path
     * @param mode
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static mkdir(path: string, mode?: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.mkdir, [path, mode]);
    }

    /**
     * Creates a unique temporary directory.
     * Generates six random characters to be appended behind a required prefix to create a unique temporary directory.
     * The created folder path is passed as promise parameter.
     *
     * @param prefix
     * @returns {Promise<string|NodeJS.ErrnoException>}
     */
    public static mkdtemp(prefix: string): Q.Promise<string|NodeJS.ErrnoException> {
        return Q.nfapply<string|NodeJS.ErrnoException>(fs.mkdtemp, [prefix]);
    }

    /**
     * open and possibly create a file
     *
     * @param path
     * @param flags
     * @param mode
     * @returns {Promise<number|NodeJS.ErrnoException>}
     */
    public static open(path: string, flags: string, mode?: number): Q.Promise<number|NodeJS.ErrnoException> {
        return Q.nfapply<number|NodeJS.ErrnoException>(fs.open, [path, flags, mode]);
    }

    /**
     * Read data from the file specified by fd
     *
     * @param fd
     * @param buffer - the buffer that the data will be written to.
     * @param offset - the offset in the buffer to start writing at.
     * @param length - an integer specifying the number of bytes to read.
     * @param position - an integer specifying where to begin reading from in the file.
     *                   If position is null, data will be read from the current file position.
     * @returns {Promise<number|NodeJS.ErrnoException>}
     */
    public static read(fd: string, buffer: string|Buffer, offset: number, length: number, position: number): Q.Promise<number|NodeJS.ErrnoException> {
        return Q.nfapply<number|NodeJS.ErrnoException>(fs.read, [fd, buffer, offset, length, position]);
    }

    /**
     * eads the contents of a directory.
     * Resolved with files array of the names of the files in the directory excluding '.' and '..'.
     *
     * @param path
     * @param options
     * @returns {Promise<string[]|NodeJS.ErrnoException>}
     */
    public static readdir(path: string, options?: { encoding: string }): Q.Promise<string[]|NodeJS.ErrnoException> {
        return Q.nfapply<string[]|NodeJS.ErrnoException>(fs.readdir, [path, options]);
    }

    /**
     * Reads the entire contents of a file
     *
     * @param file
     * @param options
     * @returns {Promise<string|Buffer|NodeJS.ErrnoException>}
     */
    public static readFile(file: string, options?: { encoding?: string, flag: string }): Q.Promise<string|Buffer|NodeJS.ErrnoException> {
        return Q.nfapply<string|Buffer|NodeJS.ErrnoException>(fs.readFile, [file, options]);
    }

    /**
     * Read value of a symbolic link
     *
     * @param path
     * @param options
     * @returns {Promise<string|NodeJS.ErrnoException>}
     */
    public static readlink(path: string, options: { encoding?: string }): Q.Promise<string|NodeJS.ErrnoException> {
        return Q.nfapply<string|NodeJS.ErrnoException>(fs.readlink, [path, options]);
    }

    /**
     * Return the canonicalized absolute pathname
     *
     * @param path
     * @param options
     * @returns {Promise<string|NodeJS.ErrnoException>}
     */
    public static realpath(path: string, options: { encoding?: string }): Q.Promise<string|NodeJS.ErrnoException> {
        return Q.nfapply<string|NodeJS.ErrnoException>(fs.realpath, [path, options]);
    }

    /**
     * Change the name or location of a file
     *
     * @param oldPath
     * @param newPath
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static rename(oldPath: string, newPath: string): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.rename, [oldPath, newPath]);
    }

    /**
     * Delete directory
     *
     * @param path
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static rmdir(path: string|Buffer): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.rmdir, [path]);
    }

    /**
     * Gets fs.Stats
     *
     * @param path
     * @returns {Promise<fs.Stats|NodeJS.ErrnoException>}
     */
    public static stat(path: string|Buffer): Q.Promise<fs.Stats|NodeJS.ErrnoException> {
        return Q.nfapply<fs.Stats|NodeJS.ErrnoException>(fs.stat, [path]);
    }

    /**
     * Creates symbolic link
     * Windows only
     *
     * @param target
     * @param path
     * @param type
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static symlink(target: string|Buffer, path: string|Buffer, type: string): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.symlink, [target, path, type]);
    }

    /**
     * Truncate a file to a specified length
     *
     * @param path
     * @param len
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static truncate(path: string|Buffer, len: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.truncate, [path, len]);
    }

    /**
     * Delete a name and possibly the file it refers to
     *
     * @param path
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static unlink(path: string|Buffer): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.unlink, [path]);
    }

    /**
     * Stop watching for changes on filename.
     * If listener is specified, only that particular listener is removed.
     * Otherwise, all listeners are removed and you have effectively stopped watching filename.
     *
     * @param filename
     * @param listener
     */
    public static unwatchFile(filename: string, listener: (curr: fs.Stats, prev: fs.Stats) => void): void {
        fs.unwatchFile(filename, listener);
    }

    /**
     * Change file timestamps of the file referenced by the supplied path.
     *
     * @param path
     * @param atime
     * @param mtime
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static utimes(path: string|Buffer, atime: number, mtime: number): Q.Promise<void|NodeJS.ErrnoException> {
        return Q.nfapply<void|NodeJS.ErrnoException>(fs.utimes, [path]);
    }

    /**
     * Watch for changes on filename, where filename is either a file or a directory.
     *
     * @param filename
     * @param options
     * @param listener
     * @returns {FSWatcher}
     */
    public static watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): fs.FSWatcher {
        return fs.watch(filename, options, listener);
    }

    /**
     * Watch for changes on filename.
     * The callback listener will be called each time the file is accessed.
     *
     * @param filename
     * @param options
     * @param listener
     */
    public static watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: fs.Stats, prev: fs.Stats) => void): void {
        fs.watchFile(filename, options, listener);
    }

    /**
     * Write buffer to the file specified by fd
     *
     * @param fd
     * @param buffer
     * @param offset
     * @param length
     * @param position
     * @returns {Promise<void|NodeJS.ErrnoException>}
     */
    public static write(fd: number, buffer: string|Buffer, offset: number, length: number, position: number): Q.Promise<void|NodeJS.ErrnoException> {
        // TODO: write buffer and string, string needs enconding... maybe two methods write and writeBuffer
        throw new ImplementException();
        // return Q.nfapply<void|NodeJS.ErrnoException>(fs.write, [fd, buffer, offset, length, position]);
    }
    
}


