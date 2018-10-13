/*************************************************************************************
 * (c) 2016, Master Technology
 *
 * Licensed under the APACHE license or contact me for a Support or Commercial License
 *
 * I do contract work in most languages, so let me solve your problems!
 *
 * Any questions please feel free to email me or put a issue up on the github repo
 * Version 0.0.3                                      Nathan@master-technology.com
 ************************************************************************************/
import { ZxingBarcodeCreationOptions, NativeZXingCommon, ZxingBarcodeDecodeOptions, ZxingBarcodeDecodeResult } from './zxing.common';

declare const android;
declare const com;
declare const java;

export class NativeZXing implements NativeZXingCommon {
    // Create Mapping to make this simpler to choose a barcode type.
    public static QR_CODE = com.google.zxing.BarcodeFormat.QR_CODE;
    public static EAN_8 = com.google.zxing.BarcodeFormat.EAN_8;
    public static UPC_E = com.google.zxing.BarcodeFormat.UPC_E;
    public static EAN_13 = com.google.zxing.BarcodeFormat.EAN_13;
    public static UPC_A = com.google.zxing.BarcodeFormat.UPC_A;
    public static CODE_39 = com.google.zxing.BarcodeFormat.CODE_39;
    public static CODE_93 = com.google.zxing.BarcodeFormat.CODE_93;
    public static CODE_128 = com.google.zxing.BarcodeFormat.CODE_128;
    public static ITF = com.google.zxing.BarcodeFormat.ITF;
    public static PDF_417 = com.google.zxing.BarcodeFormat.PDF_417;
    public static CODABAR = com.google.zxing.BarcodeFormat.CODABAR;
    public static DATA_MATRIX = com.google.zxing.BarcodeFormat.DATA_MATRIX;
    public static AZTEC = com.google.zxing.BarcodeFormat.AZTEC;
    public QR_CODE = NativeZXing.QR_CODE;
    public EAN_8 = NativeZXing.EAN_8;
    public UPC_E = NativeZXing.UPC_E;
    public EAN_13 = NativeZXing.EAN_13;
    public UPC_A = NativeZXing.UPC_A;
    public CODE_39 = NativeZXing.CODE_39;
    public CODE_93 = NativeZXing.CODE_93;
    public CODE_128 = NativeZXing.CODE_128;
    public ITF = NativeZXing.ITF;
    public PDF_417 = NativeZXing.PDF_417;
    public CODABAR = NativeZXing.CODABAR;
    public DATA_MATRIX = NativeZXing.DATA_MATRIX;
    public AZTEC = NativeZXing.AZTEC;


    createBarcode(options: ZxingBarcodeCreationOptions) {
        var encode="NOTHING", width=100, height=100, format = this.QR_CODE;
        if (options) {
            if (options.encode) {
                encode = options.encode;
            }
            if (options.width) {
                width = options.width;
            }
            if (options.height) {
                height = options.height;
            }
            if (options.format) {
                format = options.format;
            }
        }
    
        var hints = new java.util.Hashtable();
        var characterset = com.google.zxing.EncodeHintType.CHARACTER_SET;
        hints.put(characterset, "utf-8");
    
        var writer = new com.google.zxing.MultiFormatWriter();
        var result = writer.encode(encode, format, width, height, hints);
        width = result.getWidth();
        height = result.getHeight();
        var pixels = [];
        for (var y=0;y<height;y++) {
            var offset = y*width;
            for (var x=0;x<width;x++) {
                pixels[offset+x] = result.get(x,y) ? 0xFF000000 : 0xFFFFFFFF;  // Black : White
            }
        }
        var bitmap = android.graphics.Bitmap.createBitmap(width, height, android.graphics.Bitmap.Config.ARGB_8888);
        bitmap.setPixels(pixels, 0, width, 0, 0, width, height);
        return bitmap;    
    }

    decodeBarcode(bitmap, options: ZxingBarcodeDecodeOptions): ZxingBarcodeDecodeResult {
        if (bitmap === null)
        {
            return null;
        }
        var width = bitmap.getWidth(), height = bitmap.getHeight();
        var totalSize = width * height;
        var buffer = java.lang.reflect.Array.newInstance(java.lang.Integer.class.getField("TYPE").get(null), totalSize);
    
        bitmap.getPixels(buffer, 0, width, 0, 0, width, height);
    
        var source = new com.google.zxing.RGBLuminanceSource(width, height, buffer);
        var hybBitmap = new com.google.zxing.BinaryBitmap(new com.google.zxing.common.HybridBinarizer(source));
        source = null; buffer = null;
        var hints = null;
    
        if (options && options.formats) {
            var decodeFormats = new java.util.Vector();
            for (var i=0;i<options.formats.length;i++) {
                decodeFormats.add(options.formats[i]);
            }
    
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.POSSIBLE_FORMATS, decodeFormats);
            }
        }
    
        if (options && options.tryHarder) {
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.TRY_HARDER,  java.lang.Boolean.TRUE);
            }
        }
    
        if (options && options.characterSet) {
            if (!hints) {
                hints = new java.util.Hashtable();
                hints.put(com.google.zxing.DecodeHintType.CHARACTER_SET, options.characterSet);
            }
        }
    
    
        var reader = new com.google.zxing.MultiFormatReader();
        try
        {
            if (hints) {
                reader.setHints(hints);
            }
            var result = reader.decode(hybBitmap);
            hybBitmap = null;

            return {
                format: result.getBarcodeFormat().toString(),
                barcode: result.getText(),
            }
        }
        catch (err)
        {
            // console.log(err);
        }
        return null;
    }
}