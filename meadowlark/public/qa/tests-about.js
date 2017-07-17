suite('"About" Page Tests', function(){
    test('page shold contain link to contact page', function(){
        assert($('a[href="/contact"]').length);
    });
});