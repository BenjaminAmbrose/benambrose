def on_post_page(output: str, page, config) -> str:
    """
    The landing theme's <head> doesn't declare a character encoding or a mobile
    viewport. Without the charset, browsers can misread UTF-8 characters
    (e.g. "·" shows as "Â·"), so insert both right after <head>.
    """
    if "<meta charset" in output:
        return output
    return output.replace(
        "<head>",
        '<head>\n    <meta charset="utf-8">\n'
        '    <meta name="viewport" content="width=device-width, initial-scale=1">',
        1,
    )
