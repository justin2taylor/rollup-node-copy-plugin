const path = require("path");
const fs = require("fs-extra");

const unique = (array) => {
  return array.filter((v, i, a) => a.indexOf(v) === i);
};

const nodeSolve = ({ src, pkg, keepDevDependencies }) => {
  let allDependencies = [];
  const fullPath = path.join(src, "node_modules", pkg);
  console.log(`getting pkgs for ${fullPath}`);
  const pkgJson = path.join(fullPath, "package.json");
  if (fs.existsSync(pkgJson)) {
    const raw = fs.readFileSync(pkgJson, { encoding: "utf-8" });
    const json = JSON.parse(raw);
    let { dependencies, devDependencies } = json;
    const depList = dependencies ? Object.keys(dependencies) : [];
    const devDepList = devDependencies ? Object.keys(devDependencies) : [];
    const resDepList = keepDevDependencies
      ? depList.concat(devDepList)
      : depList;
    if (resDepList.length > 0) {
      allDependencies = allDependencies.concat(resDepList);
      resDepList.map((name) => {
        allDependencies = allDependencies.concat(
          nodeSolve({ src, pkg: name, keepDevDependencies })
        );
      });
    }
  }
  return allDependencies || [];
};

const rollupNodeCopyPlugin = ({ packages, keepDevDependencies, src, dest }) => {
  return {
    name: "copy-node-modules",
    buildEnd: async () => {
      console.log(`Smart Copy ${packages.length} Node Modules`);
      const allPkg = packages.flatMap((pkg) =>
        nodeSolve({ src, pkg, keepDevDependencies })
      );
      const uniqePkg = unique(allPkg);
      console.log(uniqePkg.length);
      fs.ensureDirSync(path.join(dest, "node_modules"));
      uniqePkg.map((pkg) => {
        const fullSrcPath = path.join(src, "node_modules", pkg);
        const fullDstPath = path.join(dest, "node_modules", pkg);
        fs.copySync(fullSrcPath, fullDstPath);
      });
    },
  };
};

export default rollupNodeCopyPlugin;
