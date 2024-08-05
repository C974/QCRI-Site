import IslandRepo from "D:/GItHub/QCRI-Site/QCRI-Site/app/repo/island-repo.js";


// export async function GET(request,{params1},{params2}) {
//     console.log(params1,params2)
//     const id1=params1.id1;
//     const id2=params2.id2;
//     const check=await IslandRepo.checkNodesPresent(id1,id2);
//     return Response.json({check}, { status: 200 });
// }



export async function GET(request, { params }) {
    const { id1, id2 } = params;
    const check = await IslandRepo.checkNodesPresent(id1, id2);
    return new Response(JSON.stringify({ check }), { status: 200 });
  }
  

// export async function GET(request) {
//     // Extract the URL from the request
//     const url = new URL(request.url);
//     // Extract the pathname and split it to get the parameters
//     const params = url.pathname.split('/');

//     // Get id1 and id2 from the parameters
//     const id1 = params[params.length - 2];
//     const id2 = params[params.length - 1];

//     const islandRepo = new IslandRepo(); // Create an instance of IslandRepo
//     const check = await islandRepo.checkNodesPresent(id1, id2);

//     return new Response(JSON.stringify({ check }), { status: 200 });
// }