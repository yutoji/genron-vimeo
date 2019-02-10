hello:
	echo "hello"
init:
	yarn install

titles:
	pushd tool && ts-node makeTitleMap.ts sources/titles-data.txt > ../src/data/titles-data.tsx && popd

sheet_to_titles:
	pushd scripts && ts-node src/load_and_write_vimeo_sheet.ts ../src/data/titles-data.tsx && popd

data_commit:
	git diff --shortstat | grep -v "1 file changed, 1 insertion(+)" && git commit src/data/ -m "Update src/data, automatically" && git push
