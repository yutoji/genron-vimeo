hello:
	echo "hello"

titles:
	pushd tool && ts-node makeTitleMap.ts sources/titles-data.txt > ../src/data/titles-data.tsx && popd
