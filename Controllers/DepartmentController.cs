﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CompanyContactManagment.Models;

namespace CompanyContactManagment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly CompanyContactContext _context;

        // response status
        private Status status = new Status();
        public DepartmentController(CompanyContactContext context)
        {
            _context = context;
        }

        // GET: api/Department
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<DepartmentModel>>> GetDepartments()
        {
            var departments = await _context.Departments.ToListAsync();
            foreach (var department in departments)
            {
                var company = await _context.Companies.FindAsync(department.CompanyId);
                if (company != null)
                {
                    department.Company = company;
                }
            }

            return departments;
        }

        // GET: api/Department/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DepartmentModel>> GetDepartmentModel(int id)
        {
            var department = await _context.Departments.FindAsync(id);

            if (department == null)
            {
                setStatus("fail", "Department not found", 401);
                return NotFound(status);
            }

            var company = await _context.Companies.FindAsync(department.CompanyId);
            if (company != null)
            {
                department.Company = company;
            }



            return department;
        }

        // PUT: api/Department/5
        // add modification method here
        [HttpPut]
        public async Task<IActionResult> PutDepartmentModel(DepartmentModel departmentModel)
        {
            if (departmentModel.Id == 0)
            {
                setStatus("fail", "Error in request", 403);
                return BadRequest(status);
            }

            _context.Entry(departmentModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepartmentModelExists(departmentModel.Id))
                {
                    setStatus("fail", "department not found", 401);
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            setStatus("success", "update department successfully", 200);
            return Ok(status);
        }

        // POST: api/Department
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DepartmentModel>> PostDepartmentModel(DepartmentModel department)
        {
            var company = await _context.Companies.FindAsync(department.CompanyId);
            if (company == null)
            {
                setStatus("fail", "No company id found", 401);
                return NotFound(status);
            }

            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDepartmentModel", new { id = department.Id }, department);
        }

        // DELETE: api/Department/all
        [HttpDelete("all")]
        public async Task<ActionResult<DepartmentModel>> DeleteDepartmentsModel()
        {
            var list = await _context.Departments.ToListAsync();
            _context.Departments.RemoveRange(list);
            await _context.SaveChangesAsync();
            setStatus("success", "delete department successfully", 200);
            return Ok(status);
        }

        // DELETE: api/Department/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DepartmentModel>> DeleteDepartmentModel(int id)
        {
            var departmentModel = await _context.Departments.FindAsync(id);
            if (departmentModel == null)
            {
                setStatus("fail", "department not found", 401);
                return NotFound(status);
            }

            _context.Departments.Remove(departmentModel);
            await _context.SaveChangesAsync();
            setStatus("success", "delete department successfully", 200);
            return Ok(status);
        }

        private bool DepartmentModelExists(int id)
        {
            return _context.Departments.Any(e => e.Id == id);
        }

        private void setStatus(string status_, string message, int code) {            
            status.status = status_;
            status.message = message;
            status.code = code;
        }
    }
}
